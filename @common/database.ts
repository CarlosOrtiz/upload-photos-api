import { connect } from 'mongoose';

export const startConnection = async () => {
  await connect(`mongodb://localhost:${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
  })
  console.log('Database is connection')
}
