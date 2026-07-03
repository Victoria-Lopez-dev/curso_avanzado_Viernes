// Model of Git state
let gitState = {
  // 'clean' | 'modified' | 'staged'
  fileState: 'clean',
  // list of commits in local repository
  localCommits: [],
  // list of commits in remote repository (GitHub)
  remoteCommits: []
};

// DOM Elements
const btnModify = document.getElementById('btn-modify');
const btnCheckout = document.getElementById('btn-checkout');
const btnAdd = document.getElementById('btn-add');
const btnCommit = document.getElementById('btn-commit');
const btnPush = document.getElementById('btn-push');
const btnClearTerm = document.getElementById('btn-clear-term');

const commitMessageInput = document.getElementById('commit-message');
const colWorking = document.getElementById('working-dir-files');
const colStaging = document.getElementById('staging-area-files');
const colLocalRepo = document.getElementById('local-repo-commits');
const colRemoteRepo = document.getElementById('remote-repo-commits');
const terminalContent = document.getElementById('terminal-content');

// Helper to add lines to simulated terminal
function writeToTerminal(command, outputText) {
  // Remove existing cursor line
  const cursorLine = terminalContent.querySelector('.prompt');
  if (cursorLine) {
    cursorLine.remove();
  }

  // Write command (if provided)
  if (command) {
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line cmd';
    cmdLine.textContent = `guest@antigravity:~/proyecto$ ${command}`;
    terminalContent.appendChild(cmdLine);
  }

  // Write output
  if (outputText) {
    const outLine = document.createElement('div');
    outLine.className = 'term-line output';
    outLine.textContent = outputText;
    terminalContent.appendChild(outLine);
  }

  // Add empty space line
  const spaceLine = document.createElement('div');
  spaceLine.style.height = '4px';
  terminalContent.appendChild(spaceLine);

  // Add fresh prompt line with cursor
  const promptLine = document.createElement('div');
  promptLine.className = 'term-line prompt';
  promptLine.innerHTML = 'guest@antigravity:~/proyecto$ <span class="cursor">_</span>';
  terminalContent.appendChild(promptLine);

  // Scroll to bottom of terminal
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Wrapper for smooth View Transitions
function runTransition(updateDOMCallback) {
  if (document.startViewTransition) {
    document.startViewTransition(updateDOMCallback);
  } else {
    updateDOMCallback();
  }
}

// Main rendering function that syncs Git state with the DOM
function render() {
  const fileId = 'file-index';
  
  // 1. Render Working Directory
  colWorking.innerHTML = '';
  if (gitState.fileState === 'clean' || gitState.fileState === 'modified') {
    const fileCard = document.createElement('div');
    fileCard.id = fileId;
    fileCard.style.viewTransitionName = 'file-card-transition';
    
    if (gitState.fileState === 'clean') {
      fileCard.className = 'file-card clean';
      fileCard.innerHTML = `
        <div class="file-header">
          <span class="file-icon">📄</span>
          <span class="file-name">index.html</span>
        </div>
        <div class="file-status">Sin cambios (Clean)</div>
        <div class="file-preview">&lt;html&gt; ... &lt;/html&gt;</div>
      `;
    } else {
      fileCard.className = 'file-card modified';
      fileCard.innerHTML = `
        <div class="file-header">
          <span class="file-icon">📝</span>
          <span class="file-name">index.html</span>
        </div>
        <div class="file-status">Modificado (Unstaged)</div>
        <div class="file-preview">&lt;html&gt; + &lt;h1&gt;Hola Mundo&lt;/h1&gt; &lt;/html&gt;</div>
      `;
    }
    colWorking.appendChild(fileCard);
  } else {
    // If it's staged, Working Directory looks clean but index.html is still there. 
    // In Git, working tree is clean with respect to unstaged changes.
    const fileCard = document.createElement('div');
    fileCard.className = 'file-card clean';
    fileCard.innerHTML = `
      <div class="file-header">
        <span class="file-icon">📄</span>
        <span class="file-name">index.html</span>
      </div>
      <div class="file-status">Sin cambios locales (Clean)</div>
      <div class="file-preview">&lt;html&gt; ... &lt;/html&gt;</div>
    `;
    colWorking.appendChild(fileCard);
  }

  // 2. Render Staging Area
  colStaging.innerHTML = '';
  if (gitState.fileState === 'staged') {
    const fileCard = document.createElement('div');
    fileCard.id = fileId;
    fileCard.className = 'file-card staged';
    fileCard.style.viewTransitionName = 'file-card-transition';
    fileCard.innerHTML = `
      <div class="file-header">
        <span class="file-icon">➕</span>
        <span class="file-name">index.html</span>
      </div>
      <div class="file-status font-bold">Preparado (Staged)</div>
      <div class="file-preview">&lt;html&gt; + &lt;h1&gt;Hola Mundo&lt;/h1&gt; &lt;/html&gt;</div>
    `;
    colStaging.appendChild(fileCard);
  } else {
    colStaging.innerHTML = `<div class="empty-state">Área vacía. Ejecuta <code>git add</code> para preparar cambios.</div>`;
  }

  // 3. Render Local Repository (Commits)
  colLocalRepo.innerHTML = '';
  if (gitState.localCommits.length === 0) {
    colLocalRepo.innerHTML = `<div class="empty-state">Sin commits aún. Ejecuta <code>git commit</code> para guardar.</div>`;
  } else {
    gitState.localCommits.forEach(commit => {
      const commitCard = document.createElement('div');
      commitCard.className = 'commit-card';
      commitCard.innerHTML = `
        <div class="commit-header">
          <span class="commit-hash">${commit.hash}</span>
          <span class="commit-branch">${commit.pushed ? 'origin/main' : 'main'}</span>
        </div>
        <div class="commit-message">${commit.message}</div>
        <div class="commit-files">
          <span>📂 1 archivo modificado</span>
          ${commit.pushed ? '<span style="color: var(--color-push)">✓ Sincronizado</span>' : '<span style="color: var(--color-modified)">● Pendiente Push</span>'}
        </div>
      `;
      colLocalRepo.appendChild(commitCard);
    });
  }

  // 4. Render Remote Repository (GitHub Commits)
  colRemoteRepo.innerHTML = '';
  if (gitState.remoteCommits.length === 0) {
    colRemoteRepo.innerHTML = `<div class="empty-state">No se han subido commits. Ejecuta <code>git push</code>.</div>`;
  } else {
    gitState.remoteCommits.forEach(commit => {
      const commitCard = document.createElement('div');
      commitCard.className = 'commit-card remote-commit';
      commitCard.innerHTML = `
        <div class="commit-header">
          <span class="commit-hash">${commit.hash}</span>
          <span class="badge badge-remote">main</span>
        </div>
        <div class="commit-message">${commit.message}</div>
        <div class="commit-files">
          <span>📂 index.html</span>
          <span style="color: var(--color-push)">☁️ Cloud GitHub</span>
        </div>
      `;
      colRemoteRepo.appendChild(commitCard);
    });
  }

  // 5. Update buttons enabled/disabled states
  btnModify.disabled = gitState.fileState === 'modified' || gitState.fileState === 'staged';
  btnCheckout.disabled = gitState.fileState !== 'modified';
  btnAdd.disabled = gitState.fileState !== 'modified';
  btnCommit.disabled = gitState.fileState !== 'staged' || commitMessageInput.value.trim() === '';
  commitMessageInput.disabled = gitState.fileState !== 'staged';

  // Enable push if there's any local commits not pushed to remote
  const hasUnpushedCommits = gitState.localCommits.some(commit => !commit.pushed);
  btnPush.disabled = !hasUnpushedCommits;
}

// Event Listeners
btnModify.addEventListener('click', () => {
  runTransition(() => {
    gitState.fileState = 'modified';
    render();
  });
  writeToTerminal(
    '', 
    '[Modificación manual]: Has editado el archivo index.html agregando una etiqueta <h1>.\n' +
    'El archivo ahora figura como MODIFICADO (Unstaged) en tu Directorio de Trabajo.'
  );
});

btnCheckout.addEventListener('click', () => {
  runTransition(() => {
    gitState.fileState = 'clean';
    render();
  });
  writeToTerminal(
    'git checkout -- index.html',
    'Actualizada la ruta \'index.html\' desde el índice.\n' +
    'Los cambios locales no guardados han sido descartados.'
  );
});

btnAdd.addEventListener('click', () => {
  runTransition(() => {
    gitState.fileState = 'staged';
    render();
  });
  writeToTerminal(
    'git add index.html',
    'El archivo \'index.html\' ha sido agregado al área de preparación (Staging Area).\n' +
    'Listo para ser empaquetado en el próximo commit.'
  );
  // Focus commit message input for convenience
  setTimeout(() => commitMessageInput.focus(), 100);
});

commitMessageInput.addEventListener('input', () => {
  // We just need to re-evaluate the disabled status of the commit button
  btnCommit.disabled = gitState.fileState !== 'staged' || commitMessageInput.value.trim() === '';
});

btnCommit.addEventListener('click', () => {
  const message = commitMessageInput.value.trim();
  if (!message) return;

  const randomHash = Math.random().toString(16).substring(2, 9);
  
  runTransition(() => {
    // Add commit to local commits list
    gitState.localCommits.push({
      hash: randomHash,
      message: message,
      pushed: false
    });
    
    // Reset fileState back to clean since it's now committed
    gitState.fileState = 'clean';
    commitMessageInput.value = '';
    render();
  });

  writeToTerminal(
    `git commit -m "${message}"`,
    `[main ${randomHash}] ${message}\n` +
    ` 1 file changed, 1 insertion(+), 1 deletion(-)\n` +
    `Commit guardado con éxito en tu Repositorio Local.`
  );
});

btnPush.addEventListener('click', () => {
  runTransition(() => {
    // Push all local commits to remote commits list
    gitState.localCommits.forEach(commit => {
      if (!commit.pushed) {
        commit.pushed = true;
        // avoid duplicating on remote if already pushed
        if (!gitState.remoteCommits.some(rc => rc.hash === commit.hash)) {
          gitState.remoteCommits.push({ ...commit });
        }
      }
    });
    render();
  });

  writeToTerminal(
    'git push origin main',
    'Enumerating objects: 5, done.\n' +
    'Counting objects: 100% (5/5), done.\n' +
    'Delta compression using up to 8 threads\n' +
    'Compressing objects: 100% (3/3), done.\n' +
    'Writing objects: 100% (3/3), 325 bytes | 325.00 KiB/s, done.\n' +
    'To github.com:usuario/proyecto.git\n' +
    '   4a8e2b9..8f3d1c2  main -> main\n' +
    '¡Sincronizado! Commits locales subidos con éxito a tu repositorio remoto en GitHub.'
  );
});

btnClearTerm.addEventListener('click', () => {
  terminalContent.innerHTML = '';
  // Re-write intro
  const outLine = document.createElement('div');
  outLine.className = 'term-line output';
  outLine.textContent = 'Consola limpia. Modifica un archivo o ejecuta comandos para continuar.';
  terminalContent.appendChild(outLine);
  
  const promptLine = document.createElement('div');
  promptLine.className = 'term-line prompt';
  promptLine.innerHTML = 'guest@antigravity:~/proyecto$ <span class="cursor">_</span>';
  terminalContent.appendChild(promptLine);
});

// Also trigger commit on Enter press inside input
commitMessageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !btnCommit.disabled) {
    btnCommit.click();
  }
});

// Initial Render
render();
