// import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { Kafka } from 'kafkajs'

const run = async () => {
    // const registry = new SchemaRegistry({ host: 'http://localhost:8081' })
    const kafka = new Kafka({
        clientId: `pom-send`,
        brokers: ['dev-kafka.kpc.report:9092', 'dev-kafka.kpc.report:9093', 'dev-kafka.kpc.report:9094'],
    })
    const producer = kafka.producer()
    await producer.connect()
    setInterval(() => {
        producer.send({
            topic: 'dev.kpc.data.stream.processing.kingpower.aws-personalize-test-load',
            messages: [...new Array(10)].map(() => ({
                value: `{"eventType":"view_item","itemId":"849970","userId":null,"timestamp":1642765871,"sessionId":"c6df2786-57fd-40b9-bd8f-199269a5ec0e","os":"Mac OS X","device":"desktop","platform":"web","recommendationId":null}`,
            })),
        })
        console.log('send')
    }, 200)
    // await producer.disconnect()
}
run()
