const PIVOTAL_URL = `https://www.pivotaltracker.com/services/v5`;

class Request {
  constructor(client) {
    this.fetchOptions = {
      method: 'GET',
      headers: new Headers({'X-TrackerToken': client.token }),
      mode: 'cors',
      cache: 'default'
    };
  }

  async request() {
    const response = await fetch(`${PIVOTAL_URL}${this.uri()}`, this.fetchOptions)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  validateOptions(optional_parameters, options) {
    Object.keys(options).forEach(option => {
      if (!optional_parameters.has(option)) {
        throw Error(`"${option}" is not a valid parameter`);
      }
    });
  }
}

export default Request;