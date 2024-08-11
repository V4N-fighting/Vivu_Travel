import { styled } from 'styled-components';
import { Button, ContentPadding, FlexBox, FlexBoxBetween, Title, Wrapper } from '../../../../styled-components';

const FooterTopWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`
const ContentWrapper = styled(Wrapper)`
    transform: translateY(-50%);
`

const Content = styled.div`
    position: relative;
    background-color: #ff681a;
    padding: 0 60px;
    border-radius: 10px;
`

const FlexContent = styled.div`
    flex: 0 0 auto;
    width: 50%;
    max-width: 100%;
    padding-right: calc(26px / 2);
    padding-left: calc(26px / 2);
    margin-top: 0;
`

const ContentTitle = styled(Title)`
    font-size: 36px;
`

const ContentDescr = styled(Title)`
    
    font-weight: 400;
    margin-bottom: 18px;
`

const FlexImage = styled.div`
    flex: 0 0 auto;
    width: 41.6666666667%;
    max-width: 100%;
    padding-right: calc(26px / 2);
    padding-left: calc(26px / 2);
    margin-top: 0;
    justify-self: end;
`

const BoxImage = styled.div`
    margin-bottom: -15px;
    margin-top: -20px;
}
`

const ImageInFooterTop = styled.img`
    max-width: 100%;
    height: auto;
    border: none;
    border-radius: 0;
    box-shadow: none;
    vertical-align: middle;
`

function FooterTop() {
    return ( 
    <div>
        <FooterTopWrapper>
            <ContentWrapper>
                <ContentPadding>
                    <Content>
                        <FlexBoxBetween>
                            <FlexContent>
                                <ContentTitle white>Bạn đã sẵn sàng</ContentTitle>
                                <ContentDescr small white>Chỉ mất vài phút để đăng ký tài khoản VIvu MIỄN PHÍ.</ContentDescr>
                                <Button white uppercase>Đăng ký tài khoản</Button>
                            </FlexContent>
                            <FlexImage>
                                <BoxImage>
                                    <ImageInFooterTop src="./images/newsletter.png"/>
                                </BoxImage>
                            </FlexImage>
                        </FlexBoxBetween>
                    </Content>
                </ContentPadding>
            </ContentWrapper>
        </FooterTopWrapper>
    </div> 
    );
}

export default FooterTop;