### Install UV : https://docs.astral.sh/uv/getting-started/installation/

- install uv `curl -LsSf https://astral.sh/uv/install.sh | sh`
- `source $HOME/.local/bin/env`
- install the desired version : `uv python install 3.13`
- uv python list
- setup a local virtual env with apt python version
  `uv venv --python 3.13`
- pin the python version : will create a .python-version file, use --global for global configuration
  `uv python pin 3.13`