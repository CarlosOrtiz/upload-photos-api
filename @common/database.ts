import { connect } from 'mongoose';
const { DB_INDICATIVE, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, NODE_ENV, DB_OPTIONS } = process.env;

export const startConnection = async () => {
  let stringConnection = `mongodb://localhost:${DB_PORT}/${process.env.DB_DATABASE}`;

  if (NODE_ENV === 'production')
    stringConnection = `mongodb${DB_INDICATIVE}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}${DB_OPTIONS}`;

  console.log(stringConnection)
  await connect(stringConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  console.log('Database is connection')
}
