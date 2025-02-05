import { useEffect, useState } from "react"

export const animationDesktop = (mainRef, setHalfPage, setScrollIncrement) => {

    let timeoutHalfPage;

    const scrollHandler = (e) => {
        if (mainRef.current) {
            
            const heightScreen = window.innerHeight
            const scrollPosition = window.scrollY

            if (heightScreen > scrollPosition) {
                if (timeoutHalfPage !== null) clearTimeout(timeoutHalfPage)
                timeoutHalfPage = setTimeout(() => setHalfPage(false), 300);
            } else {
                if (timeoutHalfPage !== null) clearTimeout(timeoutHalfPage)
                timeoutHalfPage = setTimeout(() => setHalfPage(true), 300);
            }

            const projectArea = mainRef.current.children[3].children[0]
            const projectPosition = projectArea.offsetTop + ( projectArea.clientHeight / 2.25)

            if (projectPosition < ( heightScreen + scrollPosition) && projectPosition > scrollPosition) {
                projectArea.style.opacity = '1'
                projectArea.style.translate = '0 0vw'
            }

            const QArea = mainRef.current.children[4]
            
            const QAreaPosition = QArea.offsetTop + ( QArea.clientHeight / 2.25)
            const QIcon = QArea.children[0]
            const QHead = QArea.children[1].children[0]
            const QDesc = QArea.children[1].children[1]

            if (QAreaPosition < ( heightScreen + scrollPosition) && QAreaPosition > scrollPosition) {
                QHead.style.opacity = '1'
                QHead.style.transform = 'translate(0,0)'
                setTimeout(() => {
                    QDesc.style.opacity = '1'
                    QDesc.style.transform = 'translate(0,0)'
                }, 300);
                setTimeout(() => {
                    QIcon.style.opacity = '1'
                    QIcon.style.transform = 'translate(0,0)'
                }, 900);
            }

            const aboutArea = mainRef.current.children[6]

            const aboutTitle = aboutArea.children[0].children[0]
            const aboutTitlePosition = aboutTitle.offsetTop + ( aboutTitle.clientHeight / 2.25)
            const aboutDesc = aboutArea.children[0].children[1]
            const aboutDescPosition = aboutDesc.offsetTop + ( aboutDesc.clientHeight / 2.25)

            if (aboutTitlePosition < ( heightScreen + scrollPosition) && aboutTitlePosition > scrollPosition) {
                aboutTitle.style.opacity = '1'
                aboutTitle.style.translate = '0vw'
            }
            
            // if (aboutTitlePosition - 50 < scrollPosition || aboutTitlePosition + 200 > ( heightScreen + scrollPosition)) {
            //     aboutTitle.style.opacity = '0'
            //     aboutTitle.style.translate = '-5vw'
            // }

            if (aboutTitlePosition < ( heightScreen + scrollPosition) && aboutTitlePosition > scrollPosition) {
                aboutTitle.style.opacity = '1'
                aboutTitle.style.translate = '0vw'
            }
            
            if (aboutDescPosition < ( heightScreen + scrollPosition) && aboutDescPosition > scrollPosition) {
                aboutDesc.style.opacity = '1'
                aboutDesc.style.translate = '0vw'
            }

            const peopleArea = mainRef.current.children[7].children[0]
            const peoplePosition = peopleArea.offsetTop + ( peopleArea.clientHeight / 2.25)

            if (peoplePosition < ( heightScreen + scrollPosition) && peoplePosition > scrollPosition) {
                peopleArea.style.opacity = '1'
                peopleArea.style.translate = '0 0vw'
            }
            
            const FlowButtonQnaArea = mainRef.current.children[8].children[0]
            
            const FlowButtonQnaAreaPosition = FlowButtonQnaArea.offsetTop + ( FlowButtonQnaArea.clientHeight / 2.25)

            if (FlowButtonQnaAreaPosition < ( heightScreen + scrollPosition) && FlowButtonQnaAreaPosition > scrollPosition) {
                FlowButtonQnaArea.style.opacity = '1'
                FlowButtonQnaArea.style.scale = '1'
            }

            const shortIdeaArea = mainRef.current.children[9]
            
            const shortIdeaHeadArea = shortIdeaArea.children[0]
            const shortIdeaHeadPosition = shortIdeaHeadArea.offsetTop + ( shortIdeaHeadArea.clientHeight / 2.25)

            if (shortIdeaHeadPosition < ( heightScreen + scrollPosition) && shortIdeaHeadPosition > scrollPosition) {
                shortIdeaHeadArea.style.opacity = '1'
            }
            
            const shortIdeaButtonAreaParent = shortIdeaArea.children[1]
            const shortIdeaButtonPosition = shortIdeaButtonAreaParent.offsetTop + ( shortIdeaButtonAreaParent.clientHeight / 2.25)
            const shortIdeaButtonAreaArray = shortIdeaButtonAreaParent.children

            Array.from(shortIdeaButtonAreaArray).forEach((shortIdeaButtonArea, index) => {
    
                if (shortIdeaButtonPosition < ( heightScreen + scrollPosition) && shortIdeaButtonPosition > scrollPosition) {
                    setTimeout(() => {
                        shortIdeaButtonArea.style.opacity = '1'
                        shortIdeaButtonArea.style.scale = '1'
                    }, 100 * index);
                }

            })
            
            const longIdeaHeadArea = mainRef.current.children[10].children[0]
            const longIdeaHeadPosition = longIdeaHeadArea.offsetTop + ( longIdeaHeadArea.clientHeight / 2.25)
            
            if (longIdeaHeadPosition < ( heightScreen + scrollPosition) && longIdeaHeadPosition > scrollPosition) {
                longIdeaHeadArea.style.opacity = '1'
                longIdeaHeadArea.style.translate = '0vw'
            }
            
            const detailIdeaAreaParent = mainRef.current.children[11].children
            
            Array.from(detailIdeaAreaParent).forEach((detailIdeaAreas, index) => {
                const detailIdeaAreaPosition = detailIdeaAreas.offsetTop + ( detailIdeaAreas.clientHeight / 2.25)
                
                if ((detailIdeaAreaPosition - (detailIdeaAreas.clientHeight / 2.25)) < ( heightScreen + scrollPosition) && detailIdeaAreaPosition > scrollPosition) {
                    detailIdeaAreas.style.opacity = '1'
                    detailIdeaAreas.style.translate = '0 0vw'
                }

                const detailIdeaArea = detailIdeaAreas.children[0]
                const detailIdeaIconArea = detailIdeaArea.children[0].children[0].children[0]
                
                setTimeout(() => {
                    if (detailIdeaAreaPosition < ( heightScreen + scrollPosition) && detailIdeaAreaPosition > scrollPosition) {
                        detailIdeaIconArea.style.opacity = '1'
                        detailIdeaIconArea.style.scale = '1'
                    }
                }, 1000);
                
                const detailIdeaListAreaArray = detailIdeaArea.children[0].children[0].children[1].children
                
                Array.from(detailIdeaListAreaArray).forEach((detailIdeaListArea, indexList) => {
                    if (detailIdeaAreaPosition < ( heightScreen + scrollPosition) && detailIdeaAreaPosition > scrollPosition) {
                        setTimeout(() => {
                            detailIdeaListArea.style.opacity = '1'
                            detailIdeaListArea.style.translate = '0vw'
                        }, 100 * (indexList + 1));
                    }
                    
                })
            })

            const qnaAreaParent = mainRef.current.children[12].children[0]
            const qnaAreaParentPosition = qnaAreaParent.offsetTop + ( qnaAreaParent.clientHeight / 2.25)
            
            const qnaHeaderArea = qnaAreaParent.children[0]
            const qnaHeaderAreaPosition = qnaHeaderArea.offsetTop + ( qnaHeaderArea.clientHeight / 2.25)
            

            if (qnaHeaderAreaPosition < ( heightScreen + scrollPosition) && qnaHeaderAreaPosition > scrollPosition) {
                qnaHeaderArea.style.opacity = '1'
                qnaHeaderArea.style.translate = '0vw'
            }
            
            const qnaAreaArray = qnaAreaParent.children[1].children

            Array.from(qnaAreaArray).forEach(qnaArea => {
                const qnaAreaPosition = qnaArea.offsetTop + ( qnaArea.clientHeight / 2.25)

                
                
                if (qnaAreaPosition < ( heightScreen + scrollPosition) && qnaAreaPosition > scrollPosition) {
                    Array.from(qnaArea.children).forEach(qnaAreaChild => {
                        qnaAreaChild.style.opacity = '1'
                        qnaAreaChild.style.translate = '0vw'
                    })
                }
            })

            const qnaButtonArea = qnaAreaParent.children[2]
            const qnaButtonAreaPosition = qnaButtonArea.offsetTop + ( qnaButtonArea.clientHeight / 2.25)

            if (qnaButtonAreaPosition < ( heightScreen + scrollPosition) && qnaButtonAreaPosition > scrollPosition) {
                qnaButtonArea.style.opacity = '1'
                qnaButtonArea.style.translate = '0vw'
            }

        }
    }
    scrollHandler()

    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('wheel', scrollHandler)
    
    return () => {
        window.removeEventListener('scroll', scrollHandler)
        window.removeEventListener('wheel', scrollHandler)
    }
    
}