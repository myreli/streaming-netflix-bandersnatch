# js-streaming-netflix-bandersnatch

Acesse [https://bandersnatch.myreli.vercel.app/](https://bandersnatch.myreli.vercel.app/). 

Implementação JavaScript de uma ferramenta de _streaming_ baseada no filme interativo [Black Mirror: Bandersnatch da Netflix](https://www.netflix.com/br/title/80988062):

- Streaming se adapta a diferentes velocidades de conexão
- Streaming interativo a partir de escolhas do usuário
- Download de vídeo em fragmentos (chunks)

## Desenvolvimento

Se estiver o Docker na sua máquina, basta utilizar o container de desenvolvimento. Para isso, basta abrir o projeto no VSCode, instalar as extensões recomendadas e iniciar o projeto. (Recomendado)

Se não, é necessário [configurar o ambiente](#configurar-o-ambiente).

### Iniciar

```shell
# gerar os arquivos nas resoluções necessárias
sh script.sh

# iniciar os servidores de desenvolvimento
npm run dev
```

Acesse [http://localhost:8080](http://localhost:8080/). 

### Configurar o ambiente

Se não for utilizar o container de desenvolvimento, é necessário fazer a configuração local de acordo com o seu sistema operacional:

#### Mac ou Linux

```shell
# instalar as dependencias de renderização de vídeo
apt-get install --no-install-recommends ffmpeg gpac

# instalar as dependencias
npm install

# gerar os arquivos nas resoluções necessárias
sh script.sh
```

#### Windows

O melhor é usar [WSL](https://docs.microsoft.com/pt-br/windows/wsl/install-win10), mas também é possível instalar de forma nativa: 

```shell
# instalar as dependencias de renderização de vídeo
choco install ffmpeg gpac

# instalar as dependencias
npm install

# execute no git bash ou outro terminal com comandos unix
./script.sh
```

## Deploy 

Por padrão, o deploy é feito no Vercel, através dos comandos: `npm run deploy` para subir a aplicação e `npm run deploy:assets` para subir as mídias na CDN. 

Ao executar pela primeira vez, será solicitado o login no [vercel](https://vercel.com), então é necessário criar uma conta.

## Páginas

### Lista de Títulos

![página inicial](./prints/titulos.png)

### Vídeo

![página do vídeo](./prints/demo.png)

## TODO

- Refatorar para tentar usar [DASH](https://www.youtube.com/watch?v=CPFE34ngysU)

## Créditos
- Esse projeto foi construído durante o evento [Semana JS Expert](https://javascriptexpert.com.br) com [Erick Wendel](https://erickwendel.com.br/)
- [Layout da lista](./public/index/index.html) foi baseada no  codepen do [Carlos Avila](https://codepen.io/cb2307/pen/XYxyeY)
- [Layout do video](./public/bandersnatch/index.html) foi baseado no codepen do [Benjamin Pott](https://codepen.io/benjipott/pen/JELELN)