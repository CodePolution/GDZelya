import Root from "../Root";
import { List, Avatar } from "antd";


const organizationLogos = [
    "https://avatars.githubusercontent.com/u/153453379?s=200&v=4",
    "https://avatars.githubusercontent.com/u/146663195?s=200&v=4"
]

const data = [
    {
        href: 'https://github.com/AnovaWebService/AnovaDrive',
        title: 'Anova Drive',
        image: '',
        avatar: organizationLogos[1],
        description: 'Django, Docker',
        content: 'С помощью данного сайта Вы можете загружать, смотреть и обмениваться файлами по ссылкам с настройками приватности. Сделано на Django.'
    },

    {
        href: 'https://github.com/AnovaWebService/AnovaConfluence',
        title: 'Anova Confluence',
        image: '',
        avatar: organizationLogos[1],
        description: 'Django, Docker',
        content: 'Anova Confluence позволяет объединить в команды работу над текстовыми файлами. Имеется строгая система прав. Сделано на Django.'
    },

    {
        href: 'https://github.com/CodePolution/The-Ring',
        title: 'The Ring',
        image: '',
        avatar: organizationLogos[0],
        description: 'Django, FastAPI, Docker, RabbitMQ',
        content: 'Сайт для последовательного обмена данными между настраиваемыми потоками для дальнейшей их модификации. Проект создан в целях эксперимента.'
    },

    {
        href: 'https://github.com/CodePolution/GDZelya',
        title: 'GDZelya',
        image: '',
        avatar: organizationLogos[0],
        description: 'Django Rest Framework, React, TypeScript, Docker',
        content: 'Сайт c готовыми домашними заданиями. Использует API известного сервиса gdz.ru.'
    }
]


const OurProjects = () => {


    return (
        <Root>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                <List.Item key={item.title}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />

                    {item.content}
                </List.Item>
                )}
            />
        </Root>
    )
}


export default OurProjects