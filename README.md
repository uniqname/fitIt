<script src="fitit.js"></script>

#Usage

    fitIt(<selector>)

All elements that match the `selector` will be made responsive and full width within it's container...

    
    fitIt('[src*="youtube.com"]');

<script>
    fitIt('[src*="youtube.com"], [src*="player.vimeo.com"]');
</script>
<iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>

------------

 ...including any asynchronously loaded nodes

    fitIt('[src*="youtube.com"]');
    
    document.querySelector('.async-demo__btn').addEventListener('click', function (clickEvt) {

        var container = clickEvt.target.parentElement,
            i = document.createElement('iframe');
        
        i.src = '//www.youtube.com/embed/ImlzsxHbTRQ';
        container.appendChild(i);
        container.removeChild(clickEvt.target);
    });

<figure class="async-demo">
    <button class="async-demo__btn">Load Video</button>
</figure>
<script>
    document.querySelector('.async-demo__btn').addEventListener('click', function (clickEvt) {

        var container = clickEvt.target.parentElement,
            i = document.createElement('iframe');

        i.src = '//www.youtube.com/embed/ImlzsxHbTRQ';
        container.appendChild(i);
        container.removeChild(clickEvt.target);
    });
</script>

------------

Multiple selectors can be used...

    fitIt('[src*="youtube.com"], [src*="player.vimeo.com"]');

<iframe src="//player.vimeo.com/video/1084537" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


------------

Even multiple calls.


    fitIt('[src*="youtube.com"]');
    fitIt('[src*="vine.co/"]'); 


<iframe class="vine-embed" src="https://vine.co/v/O5whBEbAdqr/embed/simple" width="600" height="600" frameborder="0"></iframe>

------------   

Before the iframe...


    fitIt('[src*="youtube.com"], [src*="player.vimeo.com"]');
    
    ...
    
    <iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>


------------


or after the iframe...


    <iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>
    
    ...
    
    fitIt('[src*="youtube.com"], [src*="vimeo.com"]');

<script>
    fitIt('[src*="vine.co/"]');
</script>