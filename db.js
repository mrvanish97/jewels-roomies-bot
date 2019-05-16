const pg = require('pg')

const LAST_MESSAGES_TABLE = 'last_messages'
const CHAT_ID_COL = 'chat_id'


const query = id => `SELECT last_message FROM last_messages WHERE chat_id=${+id}`

const transaction = id =>
`begin tran
if exists (${query(id)})
begin
update`