import * as yup from 'yup';


const Cover = yup.object({
    title: yup.string().required(),
    url: yup.string().required()
})


const Price = yup.object({
    purchase: yup.number().notRequired(),
    download: yup.number().notRequired()
})

const Book = yup.object({
    id: yup.number()
    .required(),

    parent_id: yup.number()
    .required(),

    country: yup.string()
    .notRequired(),

    subject_id: yup.number()
    .required(),

    title: yup.string()
    .required(),

    header: yup.string()
    .notRequired(),

    breadcrumb: yup.string()
    .notRequired(),

    year: yup.number()
    .required(),

    classes: yup.array()
    .of(
        yup.string()
    ),

    authors: yup.array()
    .of(
        yup.string()
    ),
    
    description: yup.string()
    .notRequired(),

    publisher: yup.string()
    .required(),

    category: yup.string()
    .required(),

    series: yup.string()
    .required(),

    subtype: yup.string()
    .notRequired(),

    study_level: yup.string()
    .required(),

    parts: yup.array()
    .of(yup.string()),

    cover: Cover,

    cover_url: yup.string()
    .notRequired(),

    search_keywords: yup.string()
    .notRequired(),

    price: Price,

    tasksView: yup.string()
    .notRequired(),

    is_paid: yup.boolean()
    .default(false),
    
    url: yup.string()
    .required(),

    priority: yup.number()
    .default(1),

    updated_at: yup.number()
    .notRequired()    
})


type TBook = yup.InferType<typeof Book>
type TCover = yup.InferType<typeof Cover>
type TPrice = yup.InferType<typeof Price>


export { Cover, Book, Price }
export type { TBook, TCover, TPrice }