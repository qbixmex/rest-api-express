## GET
curl http://localhost:3000/users

## POST

```bash
curl -d "name=James%20Webb&email=james@gmail.com" http://localhost:3000/users
```

```bash
# <variable1>=<data1>&<variable2>=<data2>&...
curl --data-urlencode "name=John Doe&email=john@gmail.com" http://localhost:3000/users
```
