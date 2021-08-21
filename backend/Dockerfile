FROM ubuntu:latest
ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"
RUN apt-get update

RUN apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b \
    && rm -f Miniconda3-latest-Linux-x86_64.sh 

RUN conda create -n covid 
RUN activate covid
RUN conda install -c conda-forge django django-cors-headers django-rest-auth rtree geopandas pandas

WORKDIR /backend
COPY . .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]