# Raspberry Pi Openzwave setup

Excerpted from these instructions:
https://github.com/OpenZWave/node-openzwave-shared/blob/master/README-raspbian.md


#### Install libudev-dev
```sudo apt-get install -y libudev-dev```

### Download the OpenZWave Unix source from [the official website
```wget http://old.openzwave.com/downloads/openzwave-1.4.1.tar.gz```

#### Untar
```tar zxvf openzwave-*.gz```

#### Compile Open-Zwave
```cd openzwave-* && make && sudo make install```

#### Update the environment variable
```
export LD_LIBRARY_PATH=/usr/local/lib
```
make it permanent by adding it to /etc/environment
```
sudo sed -i '$a LD_LIBRARY_PATH=/usr/local/lib' /etc/environment
```
At this step you can ensure Open-Zwave library is correctly installed with
```
MinOZW
```
