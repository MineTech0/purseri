import { CrewMember } from './entity/CrewMember';
import { AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity } from './entity/entities';
import { Record } from "./entity/Record"
import { Ship } from "./entity/Ship"

const allEntities = [
    Record,
    Ship,
    UserEntity,
    SessionEntity,
    VerificationTokenEntity,
    AccountEntity,
    CrewMember
]
export default allEntities