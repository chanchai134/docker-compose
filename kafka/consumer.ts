import { Kafka } from 'kafkajs'
;(async () => {
    const id = process.argv[2]
    const kafka = new Kafka({
        clientId: `pom-c-${id}`,
        brokers: ['dev-kafka.kpc.report:9092', 'dev-kafka.kpc.report:9093', 'dev-kafka.kpc.report:9094'],
    })
    const consumer = kafka.consumer({ groupId: 'test-consume' })
    // const registry = new SchemaRegistry({ host: 'http://localhost:8081' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'dev.kpc.data.stream.processing.kingpower.aws-personalize', fromBeginning: true })
    await consumer.run({
        autoCommit: false,
        eachBatchAutoResolve: false,
        eachBatch: async ({
            batch,
            resolveOffset,
            heartbeat,
            commitOffsetsIfNecessary,
            uncommittedOffsets,
            isRunning,
            isStale,
        }) => {
            for (let message of batch.messages) {
                // let g = {
                //     valule: await registry.decode(message.value),
                //     key: await registry.decode(message.key),
                // }
                console.log({
                    node: id,
                    topic: batch.topic,
                    partition: batch.partition,
                    message: {
                        value: message.value.toString(),
                        key: message.key,
                    },
                    offset: message.offset,
                })

                resolveOffset(message.offset)
                // consumer.commitOffsets
                // console.log(g.valule.fullName)
                await heartbeat()
            }
        },
    })
})()
