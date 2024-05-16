import {Fields} from './models'

export const getError = (fields: Fields, errors: any) => {
  switch (fields) {
    case Fields.amount:
      return errors.amount?.message
    case Fields.count:
      return errors.count?.message
    case Fields.domain:
      return errors.domain?.message
    case Fields.phone:
      return errors.phone?.message

    default:
      return ''
  }
}