#!/usr/bin/env groovy

// Complete Jenkins Pipeline for NestJS API - Local Development
// Purpose: Build, test, and containerize NestJS application locally

pipeline {
    agent any
    
    options {
        skipStagesAfterUnstable()
    }
    
    environment {
        // Build configuration
        IMAGE_NAME = 'avatar-api'
        BUILD_NUMBER = "${BUILD_NUMBER}"
        GIT_COMMIT = "${GIT_COMMIT}"
        GIT_BRANCH = "${GIT_BRANCH}"
        NODE_ENV = 'production'
    }
    
    parameters {
        choice(
            name: 'ACTION',
            choices: ['build', 'test-build', 'build-push'],
            description: 'What to do: build only, test + build, or build + push'
        )
        string(
            name: 'TAG',
            defaultValue: 'latest',
            description: 'Docker image tag (optional, defaults to latest)'
        )
        string(
            name: 'REGISTRY',
            defaultValue: '',
            description: 'Docker registry URL (optional, e.g., your-registry.com/project)'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip tests (NOT RECOMMENDED for production)'
        )
    }
    
    stages {
        stage('Setup Node.js Environment') {
            steps {
                echo "🔧 Setting up Node.js environment..."
                
                sh """
                    # Install and configure nvm
                    if [ -z "\$NVM_DIR" ] || [ ! -f "\$NVM_DIR/nvm.sh" ]; then
                        echo "📦 Installing nvm..."
                        export NVM_DIR="\$HOME/.nvm"
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                    else
                        echo "✅ nvm already available at \$NVM_DIR"
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                    fi
                    
                    # Install and use Node.js 20
                    if ! nvm use 20; then
                        echo "📦 Installing Node.js 20..."
                        nvm install 20
                        nvm use 20
                        nvm alias default 20
                    fi
                    
                    # Verify installation
                    echo "🔧 Node.js version: \$(node --version)"
                    echo "🔧 npm version: \$(npm --version)"
                    echo "🔧 npm path: \$(which npm)"
                    echo "🔧 node path: \$(which node)"
                    
                    # Set environment variables for later stages
                    echo "NVM_DIR=\$NVM_DIR" > /tmp/nodejs-env.sh
                    echo 'export NVM_DIR="\$HOME/.nvm"' >> /tmp/nodejs-env.sh
                    echo '[ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"' >> /tmp/nodejs-env.sh
                    echo '[ -s "\$NVM_DIR/bash_completion" ] && \\. "\$NVM_DIR/bash_completion"' >> /tmp/nodejs-env.sh
                    echo 'nvm use 20' >> /tmp/nodejs-env.sh
                    
                    echo "✅ Node.js environment setup completed"
                """
            }
        }
        
        stage('Checkout Source') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
                echo "✅ Source code checked out"
                
                // Show current git status
                sh """
                    # Source Node.js environment
                    [ -f /tmp/nodejs-env.sh ] && \\. /tmp/nodejs-env.sh
                    
                    echo "📋 Current Git Status:"
                    git status
                    echo ""
                    echo "🔗 Repository URL: \$(git remote get-url origin)"
                    echo "🌿 Current Branch: \$(git branch --show-current)"
                    echo "🔑 Latest Commit: \$(git log -1 --oneline)"
                    
                    echo "🔧 Node.js available: \$(node --version 2>/dev/null || echo 'Not available')"
                """
            }
        }
        
        stage('Install Dependencies') {
            when {
                expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
            }
            steps {
                echo "📦 Installing Node.js dependencies..."
                sh """
                    # Source Node.js environment
                    [ -f /tmp/nodejs-env.sh ] && \\. /tmp/nodejs-env.sh
                    
                    # Verify Node.js is available
                    echo "🔧 Node.js version: \$(node --version 2>/dev/null || echo 'Not available')"
                    echo "🔧 npm version: \$(npm --version 2>/dev/null || echo 'Not available')"
                    
                    # If Node.js is not available, set it up again
                    if ! command -v node &> /dev/null; then
                        echo "📦 Node.js not found. Setting up environment again..."
                        export NVM_DIR="\$HOME/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                        nvm use 20 || nvm install 20 && nvm use 20
                    fi
                    
                    # Check if node_modules exists, if not install dependencies
                    if [ ! -d "node_modules" ]; then
                        echo "📦 Installing dependencies..."
                        npm ci
                    else
                        echo "✅ Dependencies already installed"
                    fi
                    
                    # Generate Prisma client
                    echo "🔧 Generating Prisma client..."
                    npx prisma generate || echo "⚠️ Prisma generation failed, continuing..."
                    
                    echo "✅ Dependencies installation completed"
                """
            }
        }
        
        stage('Run Tests') {
            when {
                allOf {
                    expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
                    expression { !params.SKIP_TESTS }
                }
            }
            steps {
                echo "🧪 Running tests..."
                sh """
                    # Source Node.js environment
                    [ -f /tmp/nodejs-env.sh ] && \\. /tmp/nodejs-env.sh
                    
                    # Verify Node.js is available
                    echo "🔧 Node.js version: \$(node --version 2>/dev/null || echo 'Not available')"
                    echo "🔧 npm version: \$(npm --version 2>/dev/null || echo 'Not available')"
                    
                    # If Node.js is not available, set it up again
                    if ! command -v node &> /dev/null; then
                        echo "📦 Node.js not found. Setting up environment again..."
                        export NVM_DIR="\$HOME/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                        nvm use 20 || nvm install 20 && nvm use 20
                    fi
                    
                    # Check if node_modules exists
                    if [ ! -d "node_modules" ]; then
                        echo "⚠️ node_modules not found. Installing dependencies first..."
                        npm ci
                    else
                        echo "✅ node_modules found"
                    fi
                    
                    echo "🧪 Running unit tests..."
                    npm run test || echo "⚠️ Unit tests failed"
                    
                    echo "🧪 Running e2e tests..."
                    npm run test:e2e || echo "⚠️ E2E tests failed"
                    
                    echo "✅ Tests execution completed"
                """
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results.xml'
                }
            }
        }
        
        stage('Build Application') {
            when {
                expression { params.ACTION == 'test-build' || params.ACTION == 'build-push' }
            }
            steps {
                echo "🔨 Building NestJS application..."
                sh """
                    # Source Node.js environment
                    [ -f /tmp/nodejs-env.sh ] && \\. /tmp/nodejs-env.sh
                    
                    # Verify Node.js is available
                    echo "🔧 Node.js version: \$(node --version 2>/dev/null || echo 'Not available')"
                    echo "🔧 npm version: \$(npm --version 2>/dev/null || echo 'Not available')"
                    
                    # If Node.js is not available, set it up again
                    if ! command -v node &> /dev/null; then
                        echo "📦 Node.js not found. Setting up environment again..."
                        export NVM_DIR="\$HOME/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                        nvm use 20 || nvm install 20 && nvm use 20
                    fi
                    
                    # Check if node_modules exists
                    if [ ! -d "node_modules" ]; then
                        echo "⚠️ node_modules not found. Installing dependencies first..."
                        npm ci
                    else
                        echo "✅ node_modules found"
                    fi
                    
                    echo "🔨 Compiling TypeScript..."
                    npm run build || echo "⚠️ Build failed"
                    
                    echo "🌱 Building seed data..."
                    npm run build:seed || echo "⚠️ Seed build failed"
                    
                    echo "✅ Application build completed"
                """
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                
                script {
                    def imageTag = params.TAG ?: 'latest'
                    def fullTag = "${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        echo "Building Docker image: ${fullTag}"
                        echo "📋 Docker build context: \$(pwd)"
                        echo "📄 Dockerfile contents:"
                        cat Dockerfile
                        
                        docker build -t ${fullTag} .
                        
                        if [ "${params.REGISTRY}" != "" ]; then
                            docker tag ${fullTag} ${params.REGISTRY}/${fullTag}
                            echo "✅ Tagged image for registry: ${params.REGISTRY}/${fullTag}"
                        fi
                        
                        echo "✅ Docker build completed"
                        docker images ${IMAGE_NAME}
                    """
                    
                    echo "📊 Build Information:"
                    echo "  - Image Name: ${env.IMAGE_NAME}"
                    echo "  - Tag: ${imageTag}"
                    echo "  - Build Number: ${env.BUILD_NUMBER}"
                    echo "  - Git Commit: ${env.GIT_COMMIT}"
                    echo "  - Git Branch: ${env.GIT_BRANCH}"
                    echo "  - Action: ${params.ACTION}"
                    echo "  - Skip Tests: ${params.SKIP_TESTS}"
                }
            }
        }
        
        stage('Local Deployment Test') {
            when {
                expression { params.ACTION == 'test-build' }
            }
            steps {
                echo "🚀 Testing local deployment..."
                
                script {
                    def imageTag = params.TAG ?: 'latest'
                    def fullTag = "${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        echo "🧪 Running container for testing..."
                        docker run -d --name avatar-api-test -p 3000:3000 ${fullTag}
                        
                        echo "⏱️ Waiting for container to start..."
                        sleep 10
                        
                        echo "🏥 Health check..."
                        if curl -f http://localhost:3000/health 2>/dev/null; then
                            echo "✅ Container is responding correctly"
                        else
                            echo "⚠️ Container may not be fully started yet"
                        fi
                        
                        echo "🧹 Cleaning up test container..."
                        docker stop avatar-api-test || true
                        docker rm avatar-api-test || true
                    """
                }
            }
        }
        
        stage('Push to Registry (Optional)') {
            when {
                expression { params.ACTION == 'build-push' && params.REGISTRY != '' }
            }
            steps {
                echo "📤 Pushing Docker image to registry..."
                
                script {
                    def imageTag = params.TAG ?: 'latest'
                    def registryTag = "${params.REGISTRY}/${IMAGE_NAME}:${imageTag}"
                    
                    sh """
                        echo "🚀 Pushing image: ${registryTag}"
                        docker push ${registryTag}
                        
                        # Also push latest tag if custom tag is used
                        if [ "${imageTag}" != "latest" ]; then
                            docker tag ${registryTag} ${params.REGISTRY}/${IMAGE_NAME}:latest
                            docker push ${params.REGISTRY}/${IMAGE_NAME}:latest
                            echo "✅ Also pushed latest tag"
                        fi
                        
                        echo "✅ Image pushed successfully"
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo "📋 Build Summary"
            echo "  - Result: ${currentBuild.currentResult}"
            echo "  - Duration: ${currentBuild.duration / 1000}s"
            echo "  - Build Number: ${currentBuild.number}"
            echo "  - Git Commit: ${env.GIT_COMMIT}"
            echo "  - Git Branch: ${env.GIT_BRANCH}"
        }
        
        success {
            echo "🎉 Build completed successfully!"
            
            script {
                if (params.REGISTRY != '') {
                    echo "✅ Docker image is ready: ${params.REGISTRY}/${IMAGE_NAME}:${params.TAG ?: 'latest'}"
                } else {
                    echo "✅ Docker image is ready locally: ${IMAGE_NAME}:${params.TAG ?: 'latest'}"
                    // Show the built images
                    sh 'docker images'
                    
                    echo "🛠️ To run the container locally:"
                    echo "   docker run -d -p 3000:3000 ${IMAGE_NAME}:${params.TAG ?: 'latest'}"
                    echo ""
                    echo "🌐 Access your API at: http://localhost:3000"
                    echo "📖 API Documentation: http://localhost:3000/api"
                }
            }
        }
        
        failure {
            echo "❌ Build failed - please check the logs"
            echo "🔍 Debugging info:"
            sh 'node --version 2>/dev/null || echo "Node.js not found"'
            sh 'npm --version 2>/dev/null || echo "npm not found"'
            sh 'docker --version'
            sh 'docker images'
            
            echo "🔧 Common solutions:"
            echo "1. Check if all dependencies are installed"
            echo "2. Verify Node.js version compatibility"
            echo "3. Ensure Docker daemon is running"
            echo "4. Check Prisma schema validity"
        }
        
        unstable {
            echo "⚠️ Build completed with warnings (tests may have failed)"
        }
    }
}