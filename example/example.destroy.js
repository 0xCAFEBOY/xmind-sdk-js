'use strict';

const { Workbook, Topic, Zipper, Marker } = require('xmind-sdk');

const workbook = new Workbook();
const topic = new Topic({sheet: workbook.createSheet('sheet-1', 'central topic')});

const marker = new Marker();
const zip = new Zipper({path: '/tmp', workbook});

const mainTopic1 = topic.add({title: 'main topic 1'}).topicId();
const mainTopic2 = topic.add({title: 'main topic 2'}).topicId();
const mainTopic3 = topic.add({title: 'repeated'}).topicId();
const mainTopic4 = topic.add({title: 'repeated'}).topicId();


topic
  .on(mainTopic1)
  .add({title: 'subtopic 1'})
  .add({title: 'subtopic 2'});

const subtopic1 = topic.on(mainTopic3).add({title: 'subtopic 1'}).topicId();
topic.on(subtopic1)
  .note('this is a note text')
  .marker(marker.smiley('cry'))
  
const summaryId = topic.summary({title: 'Summary'}).topicId();

// The destroyed operation does not depends on the parent node
topic
  .destroy(topic.topicId('subtopic 2'))
  .destroy(mainTopic4)
  .destroy(summaryId)
  .destroy(mainTopic2);

zip.save().then(status => status && console.log('Saved'));

