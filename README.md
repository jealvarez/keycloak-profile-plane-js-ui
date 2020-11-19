# **Keycloak Profile Plane JavaScript**

Used to access to Keycloak user account page.

## **Author**

Jorge Alvarez <alvarez.jeap@gmail.com>

## **Requirements***

- Python 3+
- Pip3
- [direnv](https://direnv.net)
- [pyenv](https://github.com/pyenv/pyenv)

## **Setting Up the Environment**

- Set python virtual environment

```sh
pyenv install
virtualenv .env --python=$(cat .python-version)
direnv allow
pip install -r requirements.txt
```

## **Playground**

- Add alias IP `192.168.99.1` to loopback inteface

- Run application

```sh
./run.sh
```

- Open [http://192.168.99.1:5300](http://192.168.99.1:5300)
