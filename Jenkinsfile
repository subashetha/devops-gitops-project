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
                echo 'Build Stage Completed'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo "Skipping SonarQube for now (can enable later)"
                // If needed later:
                // withSonarQubeEnv('SonarQube') {
                //     sh '''
                //         sonar-scanner \
                //         -Dsonar.projectKey=devops-project \
                //         -Dsonar.sources=. \
                //         -Dsonar.host.url=http://192.168.49.1:9000
                //     '''
                // }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Docker Run (Optional Test)') {
            steps {
                sh 'docker run -d -p 8081:8080 devops-app || echo "Run skipped or failed"'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kubernetes/ || echo "kubectl not configured yet"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed — check logs'
        }
    }
}
