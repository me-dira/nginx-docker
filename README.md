# Nginx config samples for only me.

Please before doing anything create an network like:

```bash
docker network create nginx-network
```

And if you name your network anything but `nginx-network` please modify docker composers.

Separated to multiple directories as you can check below:
| number | Level | description |
| ------ | ----- | ----------- |
| 1 | simple | Static serving, Simple forwarding |
| 1 | intermediate | Cache(configuration, single/multiple endpoints, cache locking), |
