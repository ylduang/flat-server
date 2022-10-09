import { EntityManager } from "typeorm";
import cryptoRandomString from "crypto-random-string";
import { roomUserDAO } from "../../../dao";
import { v4 } from "uuid";

export class CreateRoomJoin {
    public constructor(private readonly t: EntityManager) {}
    public async full(info: { roomUUID: string; userUUID: string; rtcUID: string }) {
        await roomUserDAO.insert(this.t, {
            room_uuid: info.roomUUID,
            user_uuid: info.userUUID,
            rtc_uid: info.rtcUID,
        });
        return info;
    }

    public async quick(info: { roomUUID?: string; userUUID?: string; rtcUID?: string }) {
        const roomUserInfo = {
            roomUUID: info.roomUUID || v4(),
            userUUID: info.userUUID || v4(),
            rtcUID: info.rtcUID || cryptoRandomString({ length: 6, type: "numeric" }),
        };
        await this.full(roomUserInfo);
        return roomUserInfo;
    }
}