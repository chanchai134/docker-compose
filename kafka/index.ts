import { fork } from 'child_process'

const process = 1
for (let i = 0; i < process; i++) {
    fork('./consumer', [`${i}`])
}
