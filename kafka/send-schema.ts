import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'

const run = async () => {
    const registry = new SchemaRegistry({ host: 'http://localhost:8081' })
    const schema = `
    {
        "type": "record",
        "name": "RandomTest",
        "namespace": "examples",
        "fields": [{ "type": "string", "name": "id" }]
    }
    `
    const { id } = await registry.register({ type: SchemaType.AVRO, schema }, { subject: 'pom-test-key' })
    console.log(id)
}
run()
