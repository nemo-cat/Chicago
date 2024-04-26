$(document).ready(function(){
    /* ========================== NOTICE ========================== */
    let getNoticeCheck = sessionStorage.getItem('noticeCheck');
    let noticeCheck = false; // 기본값을 false로 설정

    // 세션스토리지에 값이 없거나(Null), false가 저장되어있으면 다음 실행
    if (!getNoticeCheck || getNoticeCheck == 'false')
    {
        noticeCheck = false; //세션스토리지에서 noticeCheck값을 false로 저장
        sessionStorage.setItem('noticeCheck', noticeCheck);
    }
    else
    {
        //그 외의 경우 공지사항체크를 한 것으로 간주하여 noticeCheck의 값을 true로 변경
        noticeCheck = true;
        sessionStorage.setItem('noticeCheck', noticeCheck);
    }

    // 스크롤 방지 & 맨위로 이동
    function preventScroll(event)
    {
        window.scrollTo(0, 0); // 맨 위로 스크롤 이동시킴
        event.preventDefault(); // 스크롤방지
    }

    //공지사항 확인을 안했을경우
    if (!noticeCheck)
    {
        //스크롤 방지 & 공지사항 보임
        document.addEventListener('scroll', preventScroll);
        $('#notice').css('display', 'block');
    }

    //닫기 버튼 클릭시 공지사항 사라지고, 다른 함수들 작동 시작
    $('.notice-close').click(function()
    {
        //닫기버튼 누르면 공지사항 사라지고, 다시 스크롤이 됨
        $('#notice').css('display', 'none');
        document.removeEventListener('scroll', preventScroll);

        //공지사항을 체크한 것으로 간주하고 noticeCheck값을 true로 변경해줌
        noticeCheck = true;
        //세션스토리지 값도 true로 변경하여 다음에 공지사항이 안나오도록 함.
        sessionStorage.setItem('noticeCheck', noticeCheck);
    })
    /* =========================================================== */

    gsap.registerPlugin(ScrollTrigger)
    /* ========== visual ========== */
    gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: 'top top',
            bottom: 'bottom top',
            scrub: 1,
            pin: true,
        }
    })
    .to('.visual h1', {
        opacity: 1,
        ease: 'none',
        duration: 10,
    },5)
    .to('.visual video', {
        scale: '0.4',
        ease: 'none',
        duration: 10,
        opacity: '0.3'
    },5)

    /* ========== since ========== */
    gsap.timeline({
        scrollTrigger: {
            trigger: '.since',
            start: 'top 80%',
            end: '20% 50%',
            scrub: 1,
            /* markers:true */
        }
    })
    .from('.since', {
        y: 200,
        opacity: 0,
        duration: 5,
    })


    /* ========== casting ========== */
    ScrollTrigger.matchMedia({
        "(min-width: 1025px)": function() {
            gsap.from('.casting .mainTitle',
            {
                scrollTrigger: {
                    trigger: '.casting .mainTitle',
                    start: 'top top',
                    end: 'top top',
                    scrub: 1,
                },
                scale: 5,
                opacity: 0,
                duration: 5
            }, 0)

            //가로스크롤
            let list = gsap.utils.toArray('.castingWrap ul li');
            let scrollTween = gsap.to(list, {
                //X축 스크롤 : 리스트의 총길이 -1 * 100
                xPercent: -100 * (list.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.castingWrap',
                    pin: true,
                    scrub: 1,
                    start: '60% center',
                    end: '300%', //뷰포트 높이의 300%, 숫자가 클수록 느려짐,
                }
            });

            //cating imgBox 모션
            gsap.utils.toArray('.castingWrap ul .imgBox').forEach(function(imgBox){
                //01. imgBox 커지는 애니메이션 , 화면 오른쪽에서 시작해서 중앙에서 끝나는 애니메이션
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,//가로스크롤에서 애니메이션 시점을 잡아줌
                        start: 'center right', //right->bottom이라 생각하면됨 left->top
                        end: 'center center',
                        scrub: true,
                    }
                })
                .to(imgBox, {
                    clipPath: 'inset(0%)',
                    ease: 'none',
                    duration: 1,
                },0 )


                //02. imgBox 작아지는 애니메이션 , 화면 중앙에서 작아지기 시작해서 왼쪽에서 끝남
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,
                        start: 'center center', 
                        end: 'center left',
                        scrub: true,
                    }
                })
                .to(imgBox, {
                    clipPath: 'inset(30%)',
                    ease: 'none',
                    duration: 1,
                },0 )
            })

            //cating textBox 모션
            gsap.utils.toArray('.casting ul .textBox').forEach(function(textBox){
                //03. textBox 커지는 애니메이션 , 화면 오른쪽에서 시작해서 중앙에서 끝나는 애니메이션
                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        containerAnimation: scrollTween,
                        start: 'center 70%',
                        end: 'center 40%',
                        scrub: true,
                    }
                })
                .to(textBox, {
                    x: '-50px',
                    opacity: 1,
                },0 )


                //04. textBox 작아지는 애니메이션 , 화면 중앙에서 작아지기 시작해서 왼쪽에서 끝남
                gsap.timeline({
                    scrollTrigger: {
                        trigger: textBox,
                        containerAnimation: scrollTween,
                        start: 'center 30%', 
                        end: 'center 20%',
                        scrub: true,
                    }
                })
                .to(textBox, {
                    x: 0,
                    opacity: 0,
                },0 )

            })

            gsap.utils.toArray('.highlight').forEach(function(highlight)
            {
                gsap.from(highlight, {
                    scrollTrigger: {
                        trigger: highlight,
                        start: '0% bottom',
                        scrub: 1,
                        toggleClass: {targets: highlight, className: 'active'}, //해당 imgBox에 클래스를 부여/제거
                    },
                }, )
            })


        },
        "(min-width: 769px)": function() {
            //circle
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.circleWrap',
                    start: '-30% 80%',
                    end: '50% 50%',
                    scrub: 1,
                }
            })
            .from('.circleWrap span', {
                width: 0,
                height: 0,
                top: 0,
                opacity: 0,
                ease: 'none',
                duration: 5,
            })
            .from('.circleWrap p', {
                top: '1000px',
                opacity: 0,
                ease: 'none',
                duration: 5,
            },3)

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.circleWrap',
                    start: '50% bottom',
                    end: '180vh',
                    scrub: 1,
                }
            })
            .to('.circleWrap span', {
                ease: 'none',
                duration: 5,
                scale: 10
            },3)


            gsap.to('.circle', {
                scrollTrigger: {
                    trigger: '.circleWrap',
                    start: 'bottom bottom',
                    end: 'bottom bottom',
                    scrub: 1,
                },
                backgroundColor: '#fff',
            })

            gsap.from('.circle video', {
                scrollTrigger: {
                    trigger: '.circle .videoBox',
                    start: '-20% bottom',
                    end: 'top bottom',
                    scrub: 1,
                },
                scale: 0
            })

            gsap.utils.toArray('.circle ul li').forEach(function(list)
            {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: list,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                    }
                })
                .from(list, {
                    opacity: 0,
                    duration: 5,
                    margin: '100px'
                },3)
            })


            gsap.timeline({
                scrollTrigger: {
                    trigger: '.circle',
                    start: 'bottom bottom',
                    end: 'bottom 70%',
                    scrub: 1,
                }
            })
            .to('.circle', {
                backgroundColor: '#000',
                ease: 'none',
                duration: 3
            })

        }
        
    })

    /* ========== info ========== */
    gsap.from('.info', {
        scrollTrigger: {
            trigger: '.info',
            start: 'top bottom',
            end: '40% 80%',
            scrub: 1,
        },
        xPercent: -100,
        duration: 3,
        ease: 'none'
    }, 1)


    /* ========== gallery ========== */
    //toArray 문서내의 요소를 배열로 만들어줌 (여러개의 imgBox를 배열로 만들어서 forEach로 반복시킴)
    let test = gsap.utils.toArray('.galleryImg').forEach(function(galleryImg)
    {
        gsap.timeline({
            scrollTrigger: {
                /*
                    자꾸 trigger 시점이 이상해서 보니까 .casting에서 end 300%한거때문에 뭔가 꼬인듯하다.
                    gsap순서 바꿔주니까 제대로 동작한다.
                */
                trigger: galleryImg,
                start: '0 bottom',
                toggleClass: {targets: galleryImg, className: 'active'}, //해당 imgBox에 클래스를 부여/제거
                scrub: 1,
            }
        })
    })

    /* ========== footer ========== */
    gsap.from('.footer',{
        scrollTrigger: {
            trigger: '.gallery',
            start: 'bottom bottom',
            end: 'bottom bottom',
            scrub: 1,
            //markers: true,
        },
        scale: 0, 
        opacity: 0,
        duration: 3,
    })

    
   

    

})