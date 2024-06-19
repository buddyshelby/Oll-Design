#!/bin/bash

filenames=".env
bootstrap/cache/config.php
composer.lock
config/app.php
index.nginx-debian.html
package-lock.json
phpunit.xml
public/assets/icon/Pages/Business/designConsult.svg
public/assets/icon/Pages/Business/graphDesign.svg
public/assets/icon/Pages/Business/perspective.svg
public/assets/icon/Pages/Business/storeDesign.svg
public/assets/icon/sort-ascending.svg
public/assets/icon/sort-descending.svg
public/assets/video/video.mp4
public/build/assets/app-25f1fd26.css
public/build/assets/app-b71da547.js
public/build/assets/ApplicationLogo-63258dea.js
public/build/assets/AuthenticatedLayout-2650c13c.js
public/build/assets/CreateGalleries-d700b754.js
public/build/assets/CreateTags-5bfd6a30.js
public/build/assets/designConsult-5e93d58c.svg
public/build/assets/Gallery-6476fa88.js
public/build/assets/graphDesign-e2a0565a.svg
public/build/assets/Home-39eabd15.js
public/build/assets/HomeSkeleton-9f1eed5c.js
public/build/assets/ImagingPanel-daeb460f.js
public/build/assets/ListGalleries-cc8e06dc.js
public/build/assets/ListTags-1623cf86.js
public/build/assets/perspective-e5b2a520.svg
public/build/assets/Portofolio-3745b329.js
public/build/assets/storeDesign-f29db1a1.svg
public/build/assets/styled-components.browser.esm-227b8331.js
public/build/assets/Welcome-4ea6f120.js
public/hot
resources/js/Components/ApplicationLogo.jsx
resources/js/Components/ToggleDown.jsx
resources/js/Layouts/AuthenticatedLayout.jsx
resources/js/Pages/Home.jsx
resources/js/Pages/Panel/Galleries/CreateGalleries.jsx
resources/js/Pages/Panel/Galleries/ListGalleries.jsx
resources/js/Pages/Panel/Imaging/ImagingPanel.jsx
resources/js/Pages/Panel/Tags/CreateTags.jsx
resources/js/Pages/Panel/Tags/ListTags.jsx
resources/js/Pages/Portofolio/Portofolio.jsx
resources/js/Pages/Welcome.jsx
resources/js/Utils/ImageGroupper/ImgGroupper.jsx
resources/views/welcome.blade.php
storage/app/public/images/01ZiXOk2mgo0Dng6bzrYieikSY3ueqJQlPTBtKB7.jpg
storage/app/public/images/7TG2Wj9SNcPG5LX5dzOdVvMofWVnBT9QkIJOyjjP.jpg
storage/app/public/images/C7bR1hnseztPoQDOwvrWWL4URqm84bgS0zWufLPa.jpg
storage/app/public/images/CaU6duao97MSAJBXHNRfvkGtBWKmRgiQreB4G3WW.jpg
storage/app/public/images/EZs8aiTMTTEaKDDHR49A7aqxGbdNqXDBg2CyBAD7.jpg
storage/app/public/images/ic1phNKiySigkZmpZh1CL0UCyDofRxev65gjhcGi.jpg
storage/app/public/images/IOi1wsrBN5T9yaPaInDAxd8IhmpsBm0efLD3BTUl.jpg
storage/app/public/images/j84yFPwcmamz0EAR9Ah7YYjtusRvdK0BCqzLDRXD.jpg
storage/app/public/images/Jcr3fVXoaaRqNCIfDHPzhTYoeMfOkHdwoKzwpqeQ.png
storage/app/public/images/Jg0EqNlDdRprbMygnsUtUHNRaq8JemjlKDP8aIxj.jpg
storage/app/public/images/kYTfCG2GUqXhz03A5IKV25k8kp2LfM6J1RJJHBjt.jpg
storage/app/public/images/lLKTfpij3jxTygE8a3dIxfjNqqT5KYr9aA7Sw3LE.jpg
storage/app/public/images/NRsnJ6jX47ue1sCV7vAnzLGbZiWmd0YhdS4tDEyU.jpg
storage/app/public/images/o0kcbtbQE13rpTflqySewpvyykwGUApdElreLj76.jpg
storage/app/public/images/QfCP0Bj5wVOBIF4ZzMOckzu2VgllpMcjGdIm9J5e.jpg
storage/app/public/images/qg9iAFjbvyxSHLcUJMhHhxtkJYdHAZM3EJnOD9jw.jpg
storage/app/public/images/Tn9kuGkgf1Ilsr6iAmq2D7uhnlRAIl4svPCQXljD.png
storage/app/public/images/UZrUsVXqc3NEoc9D2YxUhs632yx3fFTTlGa8A6uw.jpg
storage/app/public/images/W4OR719FgeBgs2FO178Qtx9p7NpiKbzXPtYrPfMl.jpg
storage/app/public/images/wX19Kkb988GdiLAhKkXCGH7oekVcSt4jhmj4cbE2.jpg
storage/app/public/images/yPMJnsucF7szFzyTHdmsTIFpXqqKKsdTJxeYDtIw.jpg
storage/app/public/images/zovHdePVgiMBshAd6RNviR87OI0MUcYkRiNaQ4gO.jpg
storage/framework/sessions/BxtFtpJJrNzq1cC5nvabwdpBBOUmGGcTZkwROsE4
storage/framework/sessions/e56TJVgKRQKq168tu5LCl2fa8AbNqrPtreElABZY
storage/framework/sessions/gziYIPv3U09krepEvltK2jY773qQaFkYpW3iZOec"

for xy in `echo "${filenames}"`;do
  cat ${xy} | sed 's/http:\/\//https:\/\//g' > file.tmp
  mv file.tmp ${xy}
  echo "${xy}"
done

