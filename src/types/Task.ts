import * as yup from 'yup';
import { Book } from './Book';


const Task = yup.object({
    title: yup.string()
    .required(),

    title_short: yup.string()
    .required(),

    description: yup.string()
    .notRequired(),

    youtube_video_id: yup.string()
    .notRequired(),

    url: yup.string()
    .required()
})


const ExtendedTask = yup.object({
    success: yup.boolean()
    .notRequired()
    .default(false),

    message: yup.string()
    .notRequired(),

    // paths: yup.object()
    // .notRequired(),

    book: Book.required(),

    task: Task.required(),

    editions: yup.array().notRequired()
})


type TTask = yup.InferType<typeof Task>
type TExtendedTask = yup.InferType<typeof ExtendedTask>

export { Task, ExtendedTask }
export type { TTask, TExtendedTask }

