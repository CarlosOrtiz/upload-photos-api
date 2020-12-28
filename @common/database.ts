import { connect } from 'mongoose';

export const startConnection = async () => {
  await connect(`mongodb://localhost:${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  console.log('Database is connection')
}
