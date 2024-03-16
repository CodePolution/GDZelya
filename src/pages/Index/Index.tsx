import React from "react";
import Root from "../Root";
import { Divider, Typography, Card, Button } from "antd";
import { Carousel } from "react-responsive-carousel";


import '../Index.less';
import "react-responsive-carousel/lib/styles/carousel.css";
import Paragraph from "antd/es/skeleton/Paragraph";


const Index = () => {
    const handleTourOpen = () => {
        localStorage.setItem('site', JSON.stringify({showTour: true}))
    }

    return (
        <Root>
            <>
                <Carousel showArrows={false} className="carousel-root" autoPlay dynamicHeight swipeable showThumbs={false} width={'auto'}>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/carousel/carousel1.jpg`} />
                    </div>

                    <div>
                        <img src={`${process.env.PUBLIC_URL}/carousel/carousel2.jpg`} />
                    </div>

                    <div>
                        <img src={`${process.env.PUBLIC_URL}/carousel/carousel3.jpg`} />
                    </div>
                </Carousel>

                <div className="index-page-description">
                    <Divider>
                        <h3>GDZelya - сайт с готовыми домашними заданиями.</h3>
                    </Divider>

                    <div className="paragraphs">
                        <Typography.Paragraph className="paragraph">
                            Вы выбрали отличный сайт с гдз, где собрана вся информация по решению домашнего задания.
                        </Typography.Paragraph>

                        <Typography.Paragraph className="paragraph">
                            Давно не секрет, что школьники постоянно пользуются решебниками к школьным учебникам. Ведь количество предметов с каждым годом увеличивается, вместе с объемом получаемой информации, а вот время на подготовку к занятиям только уменьшается. И чтобы хоть немножко снизить нагрузку, избавить ребёнка от постоянной усталости и повысить эффективность домашней подготовки, специалисты разрабатывают сборники с ответами.
                        </Typography.Paragraph>

                        <Typography.Paragraph className="paragraph">
                            Готовые домашние задания содержат решения всех упражнений из учебников. На нашем сайте вы найдете ответы к заданиям как по русскому языку и литературе, так и по математике, алгебре и геометрии, физике и химии, немецкому и английскому языкам, истории и географии.
                        </Typography.Paragraph>

                        <Typography.Paragraph className="paragraph">
                            Собранный в ГДЗ материал отвечает всем предоставляемым требованиям общеобразовательного учреждения. Авторы разбирают каждый пункт из всех заданий учебника. Для полноты ответа, они используют различные графические иллюстрации и свои развернутые комментарии. Материал из таких пособий как на <Typography.Text keyboard>GDZelya</Typography.Text>, отлично дополняет образовательную программу по всем предметам.
                        </Typography.Paragraph>
                    </div>

                    <div className="list-text-cards">
                        <Card>
                            <Typography.Paragraph className="gdz-features">
                                <Typography.Title level={5}>
                                    Задачами готовых ответов является:
                                </Typography.Title>

                                <ul>
                                    <li>
                                        <Typography.Text>
                                            возможность самопроверки учеников 
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            помощь школьникам в решении трудных заданий
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            помощь репетиторам и учителям в подоборке всех необходимых алгоритмов для объяснения темы в классе
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            стать отличной мотивацией учеников к учебе
                                        </Typography.Text>
                                    </li>
                                </ul>
                            </Typography.Paragraph>
                        </Card>

                        <Card>
                            <Typography.Paragraph className="gdz-features">
                                <Typography.Title level={5}>
                                    Перечень дополнительных преимуществ:
                                </Typography.Title>

                                <ul>
                                    <li>
                                        <Typography.Text>
                                            только актуальная информация
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            круглосуточный доступ
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            удовлетворяет всем требованиям федеральных государственных образовательных стандартов второго поколения
                                        </Typography.Text>
                                    </li>

                                    <li>
                                        <Typography.Text>
                                            В результате вы, несомненно, получите высший балл, улучшите свою успеваемость и, конечно, значительно сэкономите время
                                        </Typography.Text>
                                    </li>
                                </ul>
                            </Typography.Paragraph>
                        </Card>
                    </div>
                </div>
            </>
        </Root>
    )
}

export default Index