#fitIt
A dependancy free, utra-slim tool for fluid width video (and other) embeds.


##Usage

```javascript
    fitIt(<selector>)
```

All elements that match the `selector` will be made responsive and full width within it's container...

```javascript    
    fitIt('[src*="youtube.com"]');
```

<figure class="async-demo demo">
<iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>
</figure>

___


Including any asynchronously loaded nodes

```javascript
    fitIt('[src*="youtube.com"]');

    document.querySelector('.async-demo__btn').addEventListener('click', function (clickEvt) {

        var container = clickEvt.target.parentElement,
            i = document.createElement('iframe');

        i.src = '//www.youtube.com/embed/ImlzsxHbTRQ';
        container.appendChild(i);
        container.removeChild(clickEvt.target);
    });
```

<figure class="async-demo demo">
<button class="async-demo__btn">Load Video</button>
</figure>

___


Multiple selectors can be used...

```javascript
    fitIt('[src*="youtube.com"], [src*="player.vimeo.com"]');
```

<figure class="async-demo demo">
<iframe src="//player.vimeo.com/video/1084537" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</figure>

___


Even multiple calls.

```javascript
    fitIt('[src*="youtube.com"]');
    fitIt('object embed');
```

<figure class="async-demo demo">
<object id="flashObj" width="480" height="270" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0"><param name="movie" value="http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1" /><param name="bgcolor" value="#FFFFFF" /><param name="flashVars" value="videoId=3867093869001&linkBaseURL=https%3A%2F%2Fwww.lds.org%2Fmedia-library%2Fvideo%2F2014-10-003-fashion-faith%3Fcategory%3Dsocial-media-sharable-videos%26lang%3Deng&playerID=710849472001&playerKey=AQ~~,AAAApYNoccE~,xDmRWfqDlPhbhwoOkZ1F_TSoe20nAtRQ&domain=embed&dynamicStreaming=true" /><param name="base" value="http://admin.brightcove.com" /><param name="seamlesstabbing" value="false" /><param name="allowFullScreen" value="true" /><param name="swLiveConnect" value="true" /><param name="allowScriptAccess" value="always" /><embed src="http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1" bgcolor="#FFFFFF" flashVars="videoId=3867093869001&linkBaseURL=https%3A%2F%2Fwww.lds.org%2Fmedia-library%2Fvideo%2F2014-10-003-fashion-faith%3Fcategory%3Dsocial-media-sharable-videos%26lang%3Deng&playerID=710849472001&playerKey=AQ~~,AAAApYNoccE~,xDmRWfqDlPhbhwoOkZ1F_TSoe20nAtRQ&domain=embed&dynamicStreaming=true" base="http://admin.brightcove.com" name="flashObj" width="480" height="270" seamlesstabbing="false" type="application/x-shockwave-flash" allowFullScreen="true" allowScriptAccess="always" swLiveConnect="true" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed></object>
</figure>

___


Before the element...

```html
    <script>
    fitIt('[src*="youtube.com"], [src*="player.vimeo.com"]');
    </script>

    <iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>
```

___


or after it...

```html
    <object data="" type="">
        <embed src="" type=""></embed>
    </object>

    <script>
    fitIt('object embed');
    </script>
```
