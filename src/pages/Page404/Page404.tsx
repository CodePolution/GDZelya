import Root from "../Root";
import { Result, Button, Avatar } from 'antd';


const Page404 = () => (
    <Root>
        <Result
            title="404"
            icon={
                <Avatar
                    size={300}
                    src='https://i.pinimg.com/originals/ef/47/14/ef4714d781c43fe59a5ecfcdae35e196.jpg'
                />
            }
            subTitle="Запрашиваемый ресурс не был найден."
            extra={<Button type="primary" onClick={() => window.history.back()}>Назад</Button>}
        />
    </Root>
)

export default Page404;