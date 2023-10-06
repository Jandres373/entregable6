import React, { Component } from 'react';

// reusado del otro proyecto pero 'optimizado' aunque creo que está peor XD
class ParticleAnimation extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.particles = [];
    this.mouseX = null;
    this.mouseY = null;
    this.canvas = null;
    this.ctx = null;
  }

  componentDidMount() {
    this.initializeCanvas();
    this.createParticles();
    this.animateParticles();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  initializeCanvas() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas?.getContext('2d');
    if (this.canvas && this.ctx) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  createParticles() {
    const { particleColor, density } = this.props;
    if (this.canvas && this.ctx) {
      const particleCount = (this.canvas.width * this.canvas.height) / (density * 2);

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const velocityX = Math.random() - 0.5;
        const velocityY = Math.random() - 0.5;

        this.particles.push({ x, y, velocityX, velocityY });
      }
    }
  }

  animateParticles() {
    const { particleColor } = this.props;

    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 0.7;
      this.ctx.fillStyle = particleColor;

      this.particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (
          particle.x > this.canvas.width + 20 ||
          particle.x < -20 ||
          particle.y > this.canvas.height + 20 ||
          particle.y < -20
        ) {
          particle.x = Math.random() * this.canvas.width;
          particle.y = Math.random() * this.canvas.height;
        }

        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, 1.5, 0, 2 * Math.PI);
        this.ctx.fill();

        if (this.mouseX !== null && this.mouseY !== null) {
          const distance = Math.sqrt(
            Math.pow(particle.x - this.mouseX, 2) +
              Math.pow(particle.y - this.mouseY, 2)
          );

          if (distance < 120) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = particleColor;
            this.ctx.globalAlpha = (120 - distance) / 120;
            this.ctx.lineWidth = 0.7;
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(this.mouseX, this.mouseY);
            this.ctx.stroke();
          }
        }

        // Enlace entre partículas peroooooooo hay que pulirle cositas. :( no me sale lo del cursor.
        this.particles.forEach((otherParticle) => {
          if (particle !== otherParticle) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 120) {
              this.ctx.beginPath();
              this.ctx.strokeStyle = particleColor;
              this.ctx.globalAlpha = (120 - distance) / 120;
              this.ctx.lineWidth = 0.7;
              this.ctx.moveTo(particle.x, particle.y);
              this.ctx.lineTo(otherParticle.x, otherParticle.y);
              this.ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  handleResize = () => {
    if (this.canvas) {
      this.canvas.width = 1600;
      this.canvas.height = 200;
      this.particles = []; // Se supone que limpia las particulas ya existentes
      this.createParticles();
    }
  };

  handleMouseMove = (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  handleMouseLeave = () => {
    this.mouseX = null;
    this.mouseY = null;
  };

  render() {
    return (
      <div className='fixed z-10 w-full overflow-hidden h-fit'>
        <canvas ref={this.canvasRef} />
        {this.props.children}
      </div>
    );
  }
}

export default ParticleAnimation;
