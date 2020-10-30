# js-streaming-netflix-bandersnatch

Implementação JavaScript de uma ferramenta de _streaming_ baseada no filme interativo [Black Mirror: Bandersnatch da Netflix](https://www.netflix.com/br/title/80988062):

- Streaming se adapta a diferentes velocidades de conexão
- Streaming interativo com o usuário

## Desenvolvimento

```shell
# gerar os arquivos nas resoluções necessárias
sh script.sh

# iniciar os servidores de desenvolvimento
npm run dev
```

Se estiver utilizando container de desenvolvimento (Docker) basta abrir o projeto no VSCode, instalar as extensões recomendadas e continuar. Se estiver executando localmente:

```shell
# instalar as dependencias de renderização de vídeo
apt-get install --no-install-recommends ffmpeg gpac

# instalar as dependencias
npm install

# gerar os arquivos nas resoluções necessárias
sh script.sh
```

## Páginas

### Lista de Títulos

![página inicial](./prints/titulos.png)

### Vídeo

![página do vídeo](./prints/demo.png)

## Créditos
- Esse projeto foi construído durante o evento [Semana JS Expert](https://javascriptexpert.com.br) com [Erick Wendel](https://erickwendel.com.br/)
- [Layout da lista](./public/index/index.html) foi baseada no  codepen do [Carlos Avila](https://codepen.io/cb2307/pen/XYxyeY)
- [Layout do video](./public/bandersnatch/index.html) foi baseado no codepen do [Benjamin Pott](https://codepen.io/benjipott/pen/JELELN)