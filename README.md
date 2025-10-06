# 🧩 WebApp

A simple web application deployed via **Helm**, managed by **ArgoCD**, and built with automated **GitHub Actions** pipelines.  
Supports both **local Kubernetes development** (e.g., via k3d / kind / Minikube) and **remote GitOps deployments**.

---

## 🚀 Features

- Containerized with **Docker**
- Deployable using **Helm charts**
- CI/CD via **GitHub Actions**
- GitOps managed using **ArgoCD**
- Ingress-based access with local hostname (e.g. `bradsapp.local`)
- Configurable through Helm `values.yaml`

---

## 🧱 Project Structure

```
webapp/
├── helmchart/ or /charts/webapp/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── configmap.yaml
├── .github/workflows/
│   └── ...-build.yaml
└── app/ (app source code)
```

---

## ⚙️ Configuration

All runtime configuration is controlled via Helm values in `values.yaml`:

```yaml
image:
  repository: enz2g/webapp
  tag: "latest"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: nginx
  host: bradsapp.local
  tls: true # set to true if using HTTPS

config:
  appVersion: "v1.0.0"
```

Environment variables from ConfigMap are automatically injected into your Deployment:

```yaml
APP_VERSION: v1.0.0
```

---

## 🧪 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/helm-build.yaml`) performs:

1. **Helm Lint & Package** – validates and packages the chart.
2. **Publish to GitHub Pages** – pushes `index.yaml` and `.tgz` to `docs/` for `https://enz2g.github.io/webapp/`.
3. **ArgoCD Sync** – ArgoCD will need to update to new chart version to bring in changes.

---

## 📦 Helm Repository

The Helm chart is hosted via GitHub Pages:

```
https://enz2g.github.io/webapp/
```

Add it to Helm:

```bash
helm repo add webapp https://enz2g.github.io/webapp/
helm repo update
```

---

## 🧰 Common Issues

### ❌ 502 Bad Gateway
- Ensure the app pod is **Running**
- Check `kubectl get svc` — service name and port must match the ingress backend
- Verify ingress points to correct host and service

### ❌ SSL or HSTS Issues
- Use a fresh hostname (e.g. `bradsapp.local`)
- Clear HSTS from your browser settings if HTTPS previously used

---

## 🧭 Useful Commands

| Action | Command |
|--------|----------|
| Lint chart | `helm lint helmchart` |
| Package chart | `helm package helmchart` |
| Run locally | `helm install local-dev-webapp ./helmchart` |
| Uninstall | `helm uninstall local-dev-webapp` |
| Debug render | `helm template helmchart` |

---

## Local app build 
```
Docker build  -t enz2g/webapp:local app\.
Docker run enz2g/webapp:local 
```
Then open a browser and go to Localhost:3000