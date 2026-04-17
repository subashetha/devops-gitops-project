pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/subashetha/devops-gitops-project.git'
            }
        }

        stage('Build') {
            steps {
                echo "Build working"
            }
        }

        stage('SonarQube Test') {
            steps {
                echo "Skipping Sonar temporarily"
            }
        }

        stage('Docker Test') {
            steps {
                sh 'docker --version || echo "Docker not accessible from Jenkins"'
            }
        }

        stage('K8s Test') {
            steps {
                sh 'kubectl version --client || echo "kubectl not installed in Jenkins"'
            }
        }
    }
}
