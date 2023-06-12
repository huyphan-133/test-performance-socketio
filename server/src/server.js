/* Simplified stock exchange made with uWebSockets.js pub/sub */
const { createApp } = require('./uws/app_factory');
const publisherFactory = require('./redis/publisher_factory');
const subscriberFactory = require('./redis/subscriber_factory');
const stockSubscriberFactory  = require('./amqp/stock_subscriber_factory');
const { initialProtoRoot } = require('./amqp/protobuf_parser');

(async()=>{
	await initialProtoRoot();

	const redis_info = {
		socket: {
			host: 'redis',
			port: 6379
		}
	};
	
	const publisher = publisherFactory.createPublisher(redis_info);
	
	const app = createApp(3000)
	
	const subscriber = subscriberFactory.createSubscriber(redis_info, app)
	
	stockSubscriberFactory.createStockSubscriber('adapter_ex.datafeed', publisher)
})()

