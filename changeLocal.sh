#!/bin/bash

filenames="resources/js/Pages/Home.jsx
resources/js/Pages/Panel/Galleries/CreateGalleries.jsx
resources/js/Pages/Panel/Galleries/ListGalleries.jsx
resources/js/Pages/Panel/Imaging/ImagingPanel.jsx
resources/js/Pages/Panel/Tags/ListTags.jsx
resources/js/Pages/Panel/Tags/CreateTags.jsx
resources/js/Pages/Portofolio/Portofolio.jsx
resources/js/Utils/ImageGroupper/ImgGroupper.jsx
resources/js/Pages/Contact/Contact.jsx"


for xy in `echo "${filenames}"`;do
  cat ${xy} | sed 's/localhost:8000/olldesign.jp/g' > file.tmp
  mv file.tmp ${xy}
done

