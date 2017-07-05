

<html>
	<head>
		<script src="./../bootstrap/js/jquery-3.0.0.min.js"></script>
		<style>
			div {
			  //position: relative;
			  height: 3em;
			  width: 3em;
			  color: #fff;
			}
			.first {			  
			  background: red;
			  display:none;
			}
			.second {
			  background: blue;
			  margin-top: -3em;
			}
		</style>
	</head>
	<body>
	
	<button class="preview">ttt</button>
	<button class="preview-single">ttt1</button>
	<br>
	<br>
	<br>
	<div class="first previewForm">красный</div>
	<div hidden class="second previewForm">синий</div>


<script>
	$( ".preview" ).click(function() {
		$(".previewForm").slideToggle("slow");
		$(".second").hide();
	});
	
	$( ".preview-single" ).click(function() {
		$(".second").slideToggle("slow");
	});
</script>
</body>
</html>