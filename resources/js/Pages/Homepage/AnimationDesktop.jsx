import { useEffect, useState } from "react"

export const animationDesktop = (mainRef) => {


    const scrollHandler = (e) => {
        if (mainRef.current) {
            const heightScreen = window.innerHeight
            const scrollPosition = window.scrollY

            const QArea = mainRef.current.children[2]
            
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
                    QIcon.style.transform = 'translate(0,-3vw)'
                }, 900);
            }

            // const projectTitleElement = mainRef.current.children[3]
            // const projectTitlePosition = projectTitleElement.offsetTop + ( projectTitleElement.clientHeight / 1.25)
    
            // if (projectTitlePosition < ( heightScreen + scrollPosition) && projectTitlePosition > scrollPosition) {
            //     projectTitleElement.style.opacity = '1'
            //     projectTitleElement.style.scale = '1'
            // }
            
            // if (projectTitlePosition < scrollPosition || projectTitlePosition > ( heightScreen + scrollPosition)) {
            //     projectTitleElement.style.opacity = '0'
            //     projectTitleElement.style.scale = '0'
            // }

            // const projectBoxElement = mainRef.current.children[4]
            // const projectBoxPosition = projectBoxElement.offsetTop + ( projectBoxElement.clientHeight / 1.25)
    
            // if (projectBoxPosition < ( heightScreen + scrollPosition) && projectBoxPosition > scrollPosition) {
            //     projectBoxElement.style.opacity = '1'
            //     projectBoxElement.style.scale = '1'
            // }
            
            // if (projectBoxPosition < scrollPosition || projectBoxPosition > ( heightScreen + scrollPosition)) {
            //     projectBoxElement.style.opacity = '0'
            //     projectBoxElement.style.scale = '0'
            // }
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