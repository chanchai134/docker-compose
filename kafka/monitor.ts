import { exec } from 'child_process'

setInterval(() => {
    exec(
        `~/Documents/docker-compose/kafka/kafka_2.13-3.0.0/bin/kafka-consumer-groups.sh --describe --bootstrap-server dev-kafka.kpc.report:9092,dev-kafka.kpc.report:9093,dev-kafka.kpc.report:9094 --group local-test-performance2-server`,
        (_, d, __) => {
            console.log(new Date().getTime())
            console.log(d)
            console.log(`----------------`)
        }
    )
}, 5000)
