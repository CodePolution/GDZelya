import Root from "../Root"
import { QRCode, Avatar, Typography, Statistic, Divider } from "antd";

import './Support.less';
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const supportMail = 'software.dev1988@gmail.com'
const supportUrl = `mailto:${supportMail}`
const supportPhone = '8 (800) 555-35-35'


const Support = () => {

    return (
        <Root>
            <div className="support-text">
                <Divider>
                    <h3>
                        Добро пожаловать на страницу технической поддержки сайта GDZelya!
                    </h3>
                </Divider>
                
                <Typography.Paragraph className="paragraph-support">
                    Если у вас возникли проблемы или вопросы при использовании нашего сайта с готовыми домашними задачами, пожалуйста, напишите нам на почту 
                    <Typography.Text code>
                        {supportMail}
                    </Typography.Text>
                    .
                </Typography.Paragraph>

                <Typography.Paragraph className="paragraph-support">
                    Наши специалисты по технической поддержке будут рады помочь вам решить любые возникшие технические проблемы и ответить на все ваши вопросы.
                </Typography.Paragraph>
                
                <Typography.Paragraph className="paragraph-support">
                    Пожалуйста, включите в свое письмо как можно больше подробностей о возникших проблемах, а также скриншоты, если это возможно. Это поможет нам быстрее и эффективнее решить ваши вопросы.
                </Typography.Paragraph>

                <Typography.Paragraph className="paragraph-support">
                    Мы стараемся реагировать на все запросы нашей почтовой поддержки в течение  
                    <Typography.Text keyboard>
                        24 часов
                    </Typography.Text>
                     , поэтому не стесняйтесь обращаться к нам с любыми вопросами. Ваше удобство и удовлетворение от использования нашего сайта - наш главный приоритет!
                </Typography.Paragraph>


                <Typography.Paragraph strong className="ending-support">
                    Спасибо за использование GDZelya. Мы ценим вас как наших пользователей и всегда готовы помочь вам!
                </Typography.Paragraph>

                <Divider className="support-text-divider"/>

                <div className="contacts">
                    <div className="contact">
                        <Statistic 
                            title={
                                <div className="statistic-title">
                                    <MailOutlined/>
                                    Эл. Почта
                                </div>
                            }
                            
                            value={supportMail}
                        />

                    </div>

                    <div className="contact">
                        <QRCode
                            size={150}
                            errorLevel="H"
                            value={supportUrl}
                            icon={`${process.env.PUBLIC_URL}/logo.svg`}
                        />
                    </div>

                    <div className="contact">
                        <Statistic 
                            title={
                                <div className="statistic-title">
                                     <PhoneOutlined />
                                    Телефон
                                </div>
                            }
                            
                            value={supportPhone}
                        />
                    </div>
                </div>
            </div>
        </Root>
    )
}


export default Support