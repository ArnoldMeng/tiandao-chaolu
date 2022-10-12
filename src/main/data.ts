import HomeDataRaw from '../../public/home2.json'
import CopyDataRaw from '../../public/home2_copy_world.json'

interface EntityRaw {
    culture_desc: string;
    group_get_type: number[];
    id: number
    layout_id: number
    name: string
    main_type: number
    second_type: number
    show: number
    tag_type: number
    use_desc: string
}

interface HomeD {
    catagory: Record<number, string>
    entity: Record<number, EntityRaw>
}

interface CopyD {
    map_info: Record<number, string>
    entity_new: number[]
    copy_world: {
        desc: Record<number, string>
        info: [number,number,number,number][]
    }
}

export const HomeData: HomeD = HomeDataRaw as any
export const CopyData: CopyD = CopyDataRaw as any

interface Entity {
    name: string;
    id: number;
    raw: EntityRaw;
    position: {
        area: string;
        x: number;
        y: number;
    }[];
}

export const Entity = CopyData.copy_world.info.reduce((res,item) => {
    const [id, areaId, x, y] = item;
    if (!res[id]) {
        const raw = HomeData.entity[id]
        const entity: Entity = {
            raw,
            id,
            name: raw.name,
            position: []
        }
        res[id] = entity
    }
    res[id].position.push({
        area: CopyData.map_info[areaId],
        x,
        y
    })
    return res
}, {} as Record<number, Entity>)