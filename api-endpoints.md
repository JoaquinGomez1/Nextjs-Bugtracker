\*Every end point is relative to the /api route

|             Route | method |       parameters       | returns |
| ----------------: | :----: | :--------------------: | ------: |
|         /projects |  GET   |        user_id         |   Array |
|         /projects |  PUT   | name,description,owner |   Array |
| /projects/issues/ |  POST  |       project_id       |   Array |
| /projects/delete/ | DELETE |       project_id       |   Array |
|                   |        |                        |         |
|             /user |  GET   |           -            |  Object |
|       /user/login |  GET   |           -            |  Object |
|      /user/logout |  GET   |           -            |  Object |
