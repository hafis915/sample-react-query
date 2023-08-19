import { ref, set, get, update, remove } from 'firebase/database'
import database from '../models'

import { generateUUID } from '../../helpers/uuid'
type NotesPayload = {
    name : string,
    uuid? : string
} 

type NotesValue = {
    name : string ,
    uuid : string
}


class Notes {

    static CreateNotes(payload : NotesPayload ) : NotesValue {
        let notes : NotesValue;
        const uuid = generateUUID()
        payload.uuid = uuid
        set(ref(database, `notes/data/${uuid}/`), payload)
        return notes
    }

    static async GetNotes() : Promise<NotesValue[]> {
        const refValue = ref(database, 'notes/data/')
        const snapshot = await get(refValue)
        let data = snapshot.val()
        data = Object.values(data)
        return data 
    }

    static async GetOneNotes(id:string): Promise<NotesValue> {
        const refValue = ref(database, `notes/data/${id}`)
        const snapshot = await get(refValue)
        const data = snapshot.val()
        return data
    }

    static async UpdateNotes(id:string, value: NotesPayload): Promise<void> {
        const refValue = ref(database, `notes/data/${id}`)
        await update(refValue, value)
    }

    static async DeleteNotes(id:string): Promise<void> {
        const refValue = ref(database, `notes/data/${id}`)
        await remove(refValue)
    }

}

export default Notes