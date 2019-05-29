import Me from './Me';

const PIVOTAL_URL = `https://www.pivotaltracker.com/services/v5`

class Pivotal {
  construct(pivotal_token = null) {
    this.pivotal_token = pivotal_token;
  }

  me() {
    return new Me(this).request();
  }

  story() {

  }

  projects() {
    return fetchProjects();
  }

  fetchStory(storyId) {
    return fetch(`${PIVOTAL_URL}/stories/${storyId}`)
    .then((storyResponse) => { return storyResponse.json(); })
    .then((storyJSON) => {
      return fetchOwners(storyJSON)
      .then((ownersJSON) => {
        storyJSON.owners = ownersJSON;
        return fetchRequester(storyJSON)
        .then((person) => {
          storyJSON.requester = person;
          return storyJSON;
        });
      })
    });
  }

  fetchOwners(story) {
    const url = `${PIVOTAL_URL}/projects/${story.project_id}/stories/${story.id}/owners`
    console.log(url);
    return fetch(url)
    .then((response) => { return response.json(); });
  }

  fetchRequester(story) {
    return fetchMemberships(story)
    .then((memberships) => {
      const membership = memberships.find((u) => u.person.id === story.requested_by_id);
      return membership.person;
    });
  }

  fetchMemberships(story) {
    const url = `${PIVOTAL_URL}/projects/${story.project_id}/memberships`
    console.log(url);
    return fetch(url)
    .then((response) => { return response.json(); });
  }

  fetchProjects() {
    return fetch(`https://www.pivotaltracker.com/services/v5/projects`)
    .then((response) => { return response.json(); });
  }
}


export default Pivotal;