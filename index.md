---
---

Table of Content
================

{% for doc in site.docs %}
  <h2>
    <a href="{{ doc.url | relative_url }}">{{ doc.number }}. {{ doc.title }}</a>
  </h2>
{% endfor %}

Blogs
=====

{% for post in site.posts %}
  <h2>
    <a href="{{ post.url | relative_url }}">
      {{ post.date | date: '%y/%m/%d' }} {{ post.title }}
    </a>
  </h2>
{% endfor %}