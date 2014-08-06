bootstrap-modal-map
===================

> This extension of the bootstrap modal plugin in let's you easily toggle a modal containing a map centered at a specified location.


Usage
-----

Usage is fairly simple: 

Create a modal with a toggle button as usual, but specify `modal-map` on the button's data-toggle attribute as well as `latitude`-, `longitude`- and `title`-options. 

```html
<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" data-toggle="modal-map" data-target="#myModal" data-latitude="51.9817" data-longitude="9.255" data-title="Bad Pyrmont am Rhein">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

Options
-------

#### options.map
Type: `Object`
Default value: `{zoom: 16}`

Specify options of the maps-instance.


#### options.defaultMaxHeight
Type: `Number`
Default value: `400`

The default max-height of the `modal-body`-element. For lower resolutions the modal is resized to fit the window.
Override this value by providing a `max-height`-css-declaration for the `modal-body`-selector.



