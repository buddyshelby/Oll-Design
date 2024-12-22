import { sleep } from "@/Utils/Sleep/sleep"

export const animationGraphicDesign = async (mainRef, focusOnPeople) => {

    const wheelHandler = (e) => {

        const heightScreen = window.innerHeight
        const scrollPosition = window.scrollY

        const QArea = mainRef.current.children[1]
        const QAreaPosition = QArea.offsetTop + ( QArea.clientHeight / 2.25)
        const QIcon = QArea.children[0]
        const QHead = QArea.children[1].children[0]
        const QDesc = QArea.children[1].children[1]
        

        if (QAreaPosition < ( heightScreen + scrollPosition)) {
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
        
        if (QAreaPosition < scrollPosition) {
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

        if (projectTitlePosition < ( heightScreen + scrollPosition)) {
            projectTitleElement.style.opacity = '1'
            projectTitleElement.style.scale = '1'
        }
        
        if (projectTitlePosition < scrollPosition) {
            projectTitleElement.style.opacity = '0'
            projectTitleElement.style.scale = '0'
        }

        const projectBoxElement = mainRef.current.children[3]
        const projectBoxPosition = projectBoxElement.offsetTop + ( projectBoxElement.clientHeight / 1.25)

        if (projectBoxPosition < ( heightScreen + scrollPosition)) {
            projectBoxElement.style.opacity = '1'
            projectBoxElement.style.scale = '1'
        }
        
        if (projectBoxPosition < scrollPosition) {
            projectBoxElement.style.opacity = '0'
            projectBoxElement.style.scale = '0'
        }

        const peopleBoxElement = mainRef.current.children[4]
        const peopleRunnerBoxElement = mainRef.current.children[4].children[0]
        const peopleBoxPosition = peopleBoxElement.offsetTop + ( peopleBoxElement.clientHeight / 1.25)

        if (peopleBoxPosition < ( heightScreen + scrollPosition) && (peopleBoxElement.style.opacity === '0' || peopleBoxElement.style.opacity === '')) {
            peopleBoxElement.style.opacity = '1'
            peopleBoxElement.style.transform = 'translate(0vw)'

            const runnerWidth = peopleRunnerBoxElement.clientWidth;
            const boxWidth = peopleBoxElement.clientWidth;
            
            setTimeout(() => {
                peopleRunnerBoxElement.style.transition = '30s linear'
                setTimeout(() => {
                    peopleRunnerBoxElement.style.transform  = `translate(calc(-${runnerWidth}px  + ${boxWidth}px))`
                }, 100);
            }, 1100);
        }
        
        if (peopleBoxPosition < scrollPosition) {
            peopleBoxElement.style.opacity = '0'
            peopleBoxElement.style.transform = 'translate(10vw)'
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