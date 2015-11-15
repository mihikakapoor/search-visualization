<!DOCTYPE html>
<html>
	<body>
	Welcome
	<%
	response.write(request.querystring("firstname"))
	response.write(" " & request.querystring("lastname"))
	%>
	</body>
</html>