import { sleep } from "@/Utils/Sleep/sleep"

export const animationMobileGraphicDesign = async (mainRef) => {

    const wheelHandler = (e) => {

        if (mainRef.current) {
            const heightScreen = window.innerHeight
            const scrollPosition = window.scrollY
    
            const QArea = mainRef.current.children[1]
            
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
            
            if (QAreaPosition < scrollPosition || QAreaPosition > ( heightScreen + scrollPosition)) {
                QHead.style.opacity = '0'
                QHead.style.transform = 'translate(10vw,0)'
                setTimeout(() => {
                    QDesc.style.opacity = '0'
                    QDesc.style.transform = 'translate(-20vw,0)'
                }, 300);
                setTimeout(() => {
                    QIcon.style.opacity = '0'
                    QIcon.style.transform = 'translate(0,-15vw)'
                }, 900);
            }
    
            const projectTitleElement = mainRef.current.children[2]
            const projectTitlePosition = projectTitleElement.offsetTop + ( projectTitleElement.clientHeight / 1.25)
    
            if (projectTitlePosition < ( heightScreen + scrollPosition) && projectTitlePosition > scrollPosition) {
                projectTitleElement.style.opacity = '1'
                projectTitleElement.style.scale = '1'
            }
            
            if (projectTitlePosition < scrollPosition || projectTitlePosition > ( heightScreen + scrollPosition)) {
                projectTitleElement.style.opacity = '0'
                projectTitleElement.style.scale = '0'
            }
    
            const projectBoxElement = mainRef.current.children[3]
            const projectBoxPosition = projectBoxElement.offsetTop + ( projectBoxElement.clientHeight / 1.25)
    
            if (projectBoxPosition < ( heightScreen + scrollPosition) && projectBoxPosition > scrollPosition) {
                projectBoxElement.style.opacity = '1'
                projectBoxElement.style.scale = '1'
            }
            
            if (projectBoxPosition < scrollPosition || projectBoxPosition > ( heightScreen + scrollPosition)) {
                projectBoxElement.style.opacity = '0'
                projectBoxElement.style.scale = '0'
            }
    
            const peopleBoxElement = mainRef.current.children[4]
            const peopleRunnerBoxElement = mainRef.current.children[4].children[0]
            const peopleBoxPosition = peopleBoxElement.offsetTop
    
            if (peopleBoxPosition < ( heightScreen + scrollPosition) && peopleBoxPosition > scrollPosition && (peopleBoxElement.style.opacity === '0' || peopleBoxElement.style.opacity === '')) {
                peopleBoxElement.style.opacity = '1'
                peopleBoxElement.style.transform = 'translate(0vw)'
    
                const runnerWidth = peopleRunnerBoxElement.clientWidth;
                const boxWidth = peopleBoxElement.clientWidth;
                
                setTimeout(() => {
                    peopleRunnerBoxElement.style.transition = '30s linear'
                    setTimeout(() => {
                        peopleRunnerBoxElement.style.translate  = `calc(-${runnerWidth}px  + ${boxWidth}px)`
                    }, 100);
                }, 1100);
            }
            
            if (peopleBoxPosition < scrollPosition || peopleBoxPosition > ( heightScreen + scrollPosition)) {
                peopleBoxElement.style.opacity = '0'
                peopleBoxElement.style.transform = 'translate(10vw)'
            }
    
            const skillsElement = mainRef.current.children[5]
            const skillsChildrenElement = mainRef.current.children[5].children[1].children
            
            const skillsTitleElement = mainRef.current.children[5].children[0]
            const skillsTitleElementPosition = skillsElement.offsetTop
    
            if (skillsTitleElementPosition < ( heightScreen + scrollPosition) && skillsTitleElementPosition > scrollPosition) {
                skillsTitleElement.style.opacity = '1'
                skillsTitleElement.style.translate = '0 0'
            }
            
            if (skillsTitleElementPosition - 20 < scrollPosition || skillsTitleElementPosition + 200 > ( heightScreen + scrollPosition)) {
                skillsTitleElement.style.opacity = '0'
                skillsTitleElement.style.translate = '0 20vw'
            }
    
            Array.from(skillsChildrenElement).forEach((item, indexes) => {
                const index = indexes + 1
                const skillsChildrenElementPosition = item.offsetTop
    
                setTimeout(() => {
                    if (skillsChildrenElementPosition < ( heightScreen + scrollPosition) && skillsChildrenElementPosition > scrollPosition) {
                        item.style.opacity = '1'
                        item.style.translate = '0 0'
                    }
                    
                    if (skillsChildrenElementPosition - 20 < scrollPosition || skillsChildrenElementPosition + 200 > ( heightScreen + scrollPosition)) {
                        item.style.opacity = '0'
                        item.style.translate = '0 20vw'
                    }
                }, 100 * index);
                
            })
    
            const ideaTitleElement = mainRef.current.children[6].children[0]
            const ideaTitlePosition = ideaTitleElement.offsetTop
            const ideaChildrenElement = mainRef.current.children[7].children[0].children
    
            if (ideaTitlePosition < ( heightScreen + scrollPosition) && ideaTitlePosition > scrollPosition) {
                ideaTitleElement.style.opacity = '1'
                ideaTitleElement.style.translate = '0 0vw'
            }
            
            if (ideaTitlePosition - 20 < scrollPosition || ideaTitlePosition + 200 > ( heightScreen + scrollPosition)) {
                ideaTitleElement.style.opacity = '0'
                ideaTitleElement.style.translate = '0 -10vw'
            }
    
            Array.from(ideaChildrenElement).forEach((item, indexes) => {
                const index = indexes + 1
                const parentBox = item.children[0]
                const parentBoxPosition = parentBox.offsetTop
    
                if (parentBoxPosition < ( heightScreen + scrollPosition) && parentBoxPosition > scrollPosition) {
                    parentBox.style.opacity = '1'
                }
    
                if (parentBoxPosition - 20 < scrollPosition || parentBoxPosition + 200 > ( heightScreen + scrollPosition)) {
                    parentBox.style.opacity = '0'
                }
    
                const ideaIcon = item.children[0].children[0]
                const ideaIconPosition = parentBox.offsetTop
    
                if (ideaIconPosition < ( heightScreen + scrollPosition) && ideaIconPosition > scrollPosition) {
                    ideaIcon.style.opacity = '1'
                    ideaIcon.style.scale = '1'
                }
    
                if (ideaIconPosition - 20 < scrollPosition || ideaIconPosition + 200 > ( heightScreen + scrollPosition)) {
                    ideaIcon.style.opacity = '0'
                    ideaIcon.style.scale = '0'
                }
    
                const ideaTitle = item.children[0].children[1]
                const ideaTitlePosition = parentBox.offsetTop
    
                if (ideaTitlePosition < ( heightScreen + scrollPosition) && ideaTitlePosition > scrollPosition) {
                    ideaTitle.style.opacity = '1'
                    ideaTitle.style.translate = '0 0vw'
                }
    
                if (ideaTitlePosition - 20 < scrollPosition || ideaTitlePosition + 200 > ( heightScreen + scrollPosition)) {
                    ideaTitle.style.opacity = '0'
                    ideaTitle.style.translate = '0 5vw'
                }
    
                const ideaHead = item.children[1].children[0]
                const ideaHeadPosition = ideaHead.offsetTop - 20
    
                if (ideaHeadPosition < ( heightScreen + scrollPosition) && ideaHeadPosition > scrollPosition) {
                    ideaHead.style.opacity = '1'
                    ideaHead.style.translate = '0 0'
                }
    
                if (ideaHeadPosition - 20 < scrollPosition || ideaHeadPosition + 200 > ( heightScreen + scrollPosition)) {
                    ideaHead.style.opacity = '0'
                    ideaHead.style.translate = '-10vw 0'
                }
    
                const ideaDesc = item.children[1].children[1]
                const ideaDescPosition = ideaDesc.offsetTop - 20
    
                if (ideaDescPosition < ( heightScreen + scrollPosition) && ideaDescPosition > scrollPosition) {
                    ideaDesc.style.opacity = '1'
                    ideaDesc.style.translate = '0 0'
                }
    
                if (ideaDescPosition - 20 < scrollPosition || ideaDescPosition + 200 > ( heightScreen + scrollPosition)) {
                    ideaDesc.style.opacity = '0'
                    ideaDesc.style.translate = '20vw 0'
                }
                
            })
    
            const footerHeadElement = mainRef.current.children[8].children[0]
            const footerHeadPosition = footerHeadElement.offsetTop
    
            if (footerHeadPosition < ( heightScreen + scrollPosition) && footerHeadPosition > scrollPosition) {
                footerHeadElement.style.opacity = '1'
                footerHeadElement.style.translate = '0vw'
            }
            
            if (footerHeadPosition - 20 < scrollPosition || footerHeadPosition + 100 > ( heightScreen + scrollPosition)) {
                footerHeadElement.style.opacity = '0'
                footerHeadElement.style.translate = '-10vw'
            }
    
            const footerDescElement = mainRef.current.children[8].children[1]
    
            if (footerHeadPosition < ( heightScreen + scrollPosition) && footerHeadPosition > scrollPosition) {
                footerDescElement.style.opacity = '1'
                footerDescElement.style.translate = '0vw'
            }
            
            if (footerHeadPosition - 20 < scrollPosition || footerHeadPosition + 100 > ( heightScreen + scrollPosition)) {
                footerDescElement.style.opacity = '0'
                footerDescElement.style.translate = '10vw'
            }
        }
    }

    wheelHandler()
    let currentTouch = 0

    const touchHandler = () => {
        window.addEventListener('touchmove', wheelHandler)

        const touchEndHandler = () => {
    
            window.removeEventListener('touchmove', wheelHandler)

        }

        window.addEventListener('touchend', touchEndHandler)
        return () => window.removeEventListener('touchend', touchEndHandler)
    }

    window.addEventListener('wheel', wheelHandler)
    window.addEventListener('scroll', wheelHandler)
    window.addEventListener('touchstart', touchHandler)
    
    return () => {
        window.removeEventListener('wheel', wheelHandler)
        window.removeEventListener('scroll', wheelHandler)
        window.removeEventListener('touchstart', touchHandler)
    }
    
}