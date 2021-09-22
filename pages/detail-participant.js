import React from 'react';
import { withRouter } from 'next/router';
import queryString from "query-string";
import { Result, Icon, Button, Divider, Card, List, Avatar, Carousel, Table, message, Descriptions } from 'antd';
import { fetch } from '@helper/fetch';
import getQueryValue from '@helper/getQueryValue';
import PenilaianCard from '../components/Recruiter/ListCardRecruiter/PenilaianCard';
import ShowingAnswer from '../components/Recruiter/ListCardRecruiter/showingAnswer';



class DetailParticipant extends React.Component {
    state = {
        Answers: [],
        dataQuestion: []
    }

    static async getInitialProps({ query }) {
        console.log('SLUG initial Bagus', query);
        return {};
    }

    fetchDetailData = async () => {
        const newQuery = queryString.parse(this.props.router.asPath.split(/\?/)[1]);
        const payload = {
            ktpNumber: newQuery.ktpNumber,
            TunnelId: newQuery.TunnelId
        }

        // setIsLoading(true);
        const { cookieLogin, refetchStep } = this.props;
        try {
            const response = await fetch({
                url: '/recruiter/participant/detail',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`,
                }, data: {
                    ...payload
                }
            })

            const status = (response.data.status || false)

            if (!status) {
                message.error(response.data.message)
                // setIsLoading(false);
            } else {
                message.success(response.data.message)
                this.setState({ ...response.data.data })
                // console.log(response.data.data)           
            }

        } catch (error) {
            message.error("Server Error")

            // setIsLoading(false);
        }
    }

    componentDidMount() {
        this.fetchDetailData();
        this.fetchQuestion();
    }

    fetchQuestion = async (cb) => {
        const newQuery = queryString.parse(this.props.router.asPath.split(/\?/)[1]);
        const payload = {
            ktpNumber: newQuery.ktpNumber,
            TunnelId: newQuery.TunnelId
        }

        const { cookieLogin, refetchStep } = this.props;


        try {
            const response = await fetch({
                url: '/question/list',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`
                },
                data: {
                    "TunnelId": payload.TunnelId || 1,
                    "isRecruiter": true
                }
            })

            const status = (response.data.status || false)

            if (status) {
                this.setState({
                    dataQuestion: response.data.data,
                })
            } else {
                message.error("Failed to Fetch")
            }

        } catch (error) {
            console.log(error)
            message.error("Server Error 2")
        }

    }



    render() {
        const { router: { query } } = this.props
        return (
            <div className="detail-result-page-wrapper">
                <h1>{this.state.name ? this.state.name : 'loading...'}  |  {this.state.Summaries ? this.state.Summaries[0].Tunnel.name : 'loading...'}</h1>
                <div>
                    <Descriptions
                        // title="Responsive Descriptions"
                        bordered
                        column={{ xxl: 1, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                    >

                        <Descriptions.Item label="Foto">
                            <Avatar shape="square" src={this.state.photoUrl ? this.state.photoUrl : null} size={128} icon="user" />
                        </Descriptions.Item>

                        <Descriptions.Item label="Nama Lengkap">{this.state.name ? this.state.name : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Nomor HP">{this.state.phone ? this.state.phone : 'loading...'}</Descriptions.Item>

                        <Descriptions.Item label="Profesi">{this.state.occupation ? this.state.occupation : ''}</Descriptions.Item>
                        <Descriptions.Item label="Instagram">{this.state.instagram ?
                            <a href={this.state.instagram} target="_blank">
                                <Button>{this.state.instagram}</Button>
                            </a>
                            : ''}</Descriptions.Item>
                        <Descriptions.Item label="Twitter">{this.state.twitter ?
                            <a href={this.state.twitter} target="_blank">
                                <Button>{this.state.twitter}</Button>
                            </a>
                            : ''}</Descriptions.Item>
                        <Descriptions.Item label="facebook">{this.state.facebook ?
                            this.state.facebook
                            : ''}</Descriptions.Item>
                        <Descriptions.Item label="website">{this.state.website ?

                            <a href={this.state.website} target="_blank">
                                <Button>{this.state.website}</Button>
                            </a>
                            : ''}</Descriptions.Item>
                        <Descriptions.Item label="Referensi">{this.state.reference_by ? this.state.reference_by : ''}</Descriptions.Item>
                        <Descriptions.Item label="Bisa Video Editing">{this.state.video_editing ? this.state.video_editing : ''}</Descriptions.Item>


                        <Descriptions.Item label="Email">{this.state.email ? this.state.email : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Alamat">{this.state.address ? this.state.address : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Kota">{this.state.cityAddress ? this.state.cityAddress : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Provinsi">{this.state.provinceAddress ? this.state.provinceAddress : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Batch FIM">{this.state.batchFim ? this.state.batchFim : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Golongan Darah">{this.state.bloodGroup ? this.state.bloodGroup : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Agama">{this.state.religion ? this.state.religion : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">{this.state.bornPlace ? this.state.bornPlace : 'loading...'}, {this.state.bornDate ? this.state.bornDate : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Nomor HP Darurat">{this.state.emergencyPhone ? this.state.emergencyPhone : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Spesialisasi">{this.state.expertise ? this.state.expertise : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Jenis Kelamin">{this.state.gender ? this.state.gender : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Hobi">{this.state.hoby ? this.state.hoby : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Institusi">{this.state.institution ? this.state.institution : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Nomor KTP">{this.state.ktpNumber ? this.state.ktpNumber : 'loading...'}</Descriptions.Item>
                        <Descriptions.Item label="Gambar KTP">
                            <img style={{ maxWidth: '400px' }} src={this.state.ktpUrl ? this.state.ktpUrl : null} />
                        </Descriptions.Item>
                    </Descriptions>



                    {this.state.dataQuestion ? (
                        <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Pertanyaan dan Jawaban Jalur {this.state.Summaries ? this.state.Summaries[0].Tunnel.name : 'loading...'}</h2>

                            {this.state.dataQuestion.map((question, index) => {
                                const { Answers } = this.state;

                                const headerQuestion = JSON.parse(question.header)
                                const entriesQ = Object.entries(headerQuestion)
                                const findAnswer = Answers.find(answer => answer.QuestionId === question.id)

                                return <>
                                    <h1 style={{ marginTop: '50px', textAlign: 'center' }}> {question.headline}</h1>
                                    <Card key={index}
                                        title={question.question}
                                        style={{ marginTop: '20px' }}
                                    >

                                        {findAnswer !== undefined && (
                                            <ShowingAnswer
                                                question={question.question}
                                                answer={findAnswer ? findAnswer : null}
                                                photoUrl={this.state.photoUrl ? this.state.photoUrl : null}
                                            />
                                        )}

                                    </Card>
                                </>
                            })}
                        </div>
                    ) : null}


                    {/* {this.state.Summaries ? (
                        <PenilaianCard scoreUpdated={this.state.Summaries ? this.state.Summaries[0] : undefined} TunnelId={query.tunnel} ktpNumber={query.slug} />
                    ) : null} */}

                </div>

                <style jsx>{`
                    
                `}</style>
            </div>
        )
    }
}

export default withRouter(DetailParticipant);